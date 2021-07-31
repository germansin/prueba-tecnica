const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "test",
});

app.post("/create-product", (req, res) => {
  const nombre = req.body.nombre;
  const stock = req.body.stock;
  console.log(req);
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
    const idproducto = request.body.idproducto;
    const cantidad = request.body.cantidad;
    const fecha = request.body.fecha;

    var orderid = 0;
    
    if(validacion.status) {
      db.query(
        "INSERT INTO purchase_order (idproducto, cantidad,fecha) VALUES (?,?,?)",
        [idproducto, cantidad,fecha],
        (err, result) => {
            if (err) {
            console.log(err);
            } else {
            orderid = result.insertId;

            db.query(
                "UPDATE product SET stock = stock + ? WHERE idproducto = ?",
                [cantidad, idproducto],
                (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    response.send("Se genero la orden de compra ID " + orderid);
                }
                }
            );
            }
        }
       );

    }else{
        response.send("Error de validacion " + validacion.mensaje); 
    }
  });
});

function validarCompra(request, response, callback) {
  const idproducto = request.body.idproducto;
  const fecha = request.body.fecha;
  const cantidad = request.body.cantidad;
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
        var total=0 + cantidad + result[0].cantidad;
        if(total>30){
            validacion.status = false;
            validacion.mensaje = "Se ha excedido el limite de compras > 30 del mes para el producto ID "+idproducto+ " compras acumuladas del mes "+result[0].cantidad;  
        }
        
        callback(request, response, validacion);
      }
    }
  );
}

app.post("/registrar-venta", (req, res) => {
  const idproducto = req.body.idproducto;
  const cantidad = req.body.cantidad;
  var orderid = 0;
  db.query(
    "INSERT INTO sales_order (idproducto, cantidad,fecha) VALUES (?,?,sysdate())",
    [idproducto, cantidad],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        orderid = result.insertId;
        db.query(
          "UPDATE product SET stock = stock - ? WHERE idproducto = ?",
          [cantidad, idproducto],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Se genero la orden de venta ID " + orderid);
            }
          }
        );
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
