# prueba-tecnica

Prueba tecnica para evaluacion de Node 

<h2>Como ejecutar con docker</h2>
<ol>
	<li>Clonar el proyecto rama master</li>
	<li>
		Ubicarse dentro del directorio y ejecutar <code>docker-compose up</code>
	</li>
	<li>
		Ingresar a la consulta de productos <code>localhost:3001/products</code> se debe mostrar los 5 productos iniciales con stock 0
	</li>
</ol>

<h2>Ejecutar localmente</h2>
<ol>
	<li>Clonar el proyecto rama master</li>
	<li>
		Ubicarse dentro del directorio y ejecutar <code>npm install</code>
	</li>
    <li>
		Levantar la bd mysql ejecutar el archivo db.sql para poblar la informacion
	</li>
    <li>
		Personalizar el archivo dbconfig.js
	</li>
	<li>
		Ingresar a la consulta de productos <code>localhost:3001/products</code> se debe mostrar los 5 productos iniciales con stock 0
	</li>
</ol>

<h2>Ejecutar test</h2>
<ol>
	<li>
		Ubicarse dentro del directorio y ejecutar <code>npm test</code>
	</li>
</ol>

<h2>Ejecutar eslint</h2>
<ol>
	<li>
		Ubicarse dentro del directorio y ejecutar <code>npm lint</code>
	</li>
</ol>

<h2>Ejecutar la app</h2>
<ol>
	<li>
		Ubicarse dentro del directorio y ejecutar <code>npm start</code>
	</li>
</ol>

<h2>/registra-compra</h2>
<code>
{ "idproducto": 1,
  "cantidad": 2,
  "fecha":"2021-08-01"
}
</code>

<h2>/registra-venta</h2>
<code>
{ "idproducto": 1,
  "cantidad": 5,
  "fecha":"2021-08-01"
}
</code>