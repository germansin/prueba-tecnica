const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const params = require('./dbconfig');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(params);

app.post("/create-product", (req, res) => {
  const { nombre, stock } = req.body;
    
  db.query(
    "INSERT INTO product (nombre, stock) VALUES (?,?)",
    [nombre, stock],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Producto creado Id " + result.insertId);
      }
    }
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/registrar-compra", (req, res) => {
  validarCompra(req, res, function (request, response, validacion) {
    const { idproducto, cantidad, fecha } = request.body;
    
    var orderid = 0;

    if (validacion.status) {
      db.query(
        "INSERT INTO purchase_order (idproducto, cantidad,fecha) VALUES (?,?,?)",
        [idproducto, cantidad, fecha],
        (err, result) => {
          if (err) {
            response.send({status:false, id:0, message:err});
          } else {
            orderid = result.insertId;

            db.query(
              "UPDATE product SET stock = stock + ? WHERE idproducto = ?",
              [cantidad, idproducto],
              (err, result) => {
                if (err) {
                  console.log(err);
                  response.send({status:false, id:0, message:err});
                } else {
                  response.send({status:true, id:orderid, message:"Se genero la orden de compra ID " + orderid});
                }
              }
            );
          }
        }
      );
    } else {
      response.send({status:false, id:0, message:"Error de validacion " + validacion.mensaje});
    }
  });
});

function validarCompra(request, response, callback) {
  const { idproducto, fecha, cantidad }= request.body;
  
  var validacion = { status: true, mensaje: "" };
  db.query(
    "select sum(cantidad) cantidad from test.purchase_order where idproducto=?  and date_format(fecha,'YYYYMM')= date_format(?,'YYYYMM')",
    [idproducto, fecha],
    (err, result) => {
      if (err) {
        console.log(err);
        validacion.status = false;
        validacion.mensaje = err;
        callback(request, response, validacion);
      } else {
        console.log("validacion cantidad " + result[0].cantidad);
        var total = 0 + cantidad + result[0].cantidad;
        if (total > 30) {
          validacion.status = false;
          validacion.mensaje =
            "Se ha excedido el limite de compras > 30 del mes para el producto ID " +
            idproducto +
            " compras acumuladas del mes " +
            result[0].cantidad;
        }

        callback(request, response, validacion);
      }
    }
  );
}

app.post("/registrar-venta", (req, res) => {

  validarVenta(req, res, function (request, response, validacion) {
    if (validacion.status) {
      const { idproducto, cantidad } = request.body;
      
      var orderid = 0;
      db.query(
        "INSERT INTO sales_order (idproducto, cantidad,fecha) VALUES (?,?,sysdate())",
        [idproducto, cantidad],
        (err, result) => {
          if (err) {
            console.log(err);
            response.send({status:false, id:0, message:err});
          } else {
            orderid = result.insertId;
            db.query(
              "UPDATE product SET stock = stock - ? WHERE idproducto = ?",
              [cantidad, idproducto],
              (err, result) => {
                if (err) {
                  console.log(err);
                  response.send({status:false, id:0, message:err});
                } else {
                  response.send({status:true, id:orderid, message:"Se genero la orden de venta ID " + orderid});
                }
              }
            );
          }
        }
      );
    } else {
      response.send({status:false, id:0, message:"Error de validacion " + validacion.mensaje});
    }
  });
});

function validarVenta(request, response, callback) {
  const { idproducto, fecha, cantidad } = request.body;
  
  var validacion = { status: true, mensaje: "" };
  db.query(
    "select nombre,stock from test.product where idproducto=?",
    [idproducto],
    (err, result) => {
      if (err) {
        console.log(err);
        validacion.status = false;
        validacion.mensaje = err;
        callback(request, response, validacion);
      } else {
        console.log("validacion stock " + result[0].stock);

        if (cantidad > result[0].stock) {
          validacion.status = false;
          validacion.mensaje =
            "No hay stock suficiente para el producto ID " +
            idproducto +
            " " +
            result[0].nombre +
            " stock actual " +
            result[0].stock;
        }

        callback(request, response, validacion);
      }
    }
  );
}

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

module.exports = app