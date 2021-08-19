# prueba-tecnica

Prueba tecnica para evaluacion de Node , german.amaro@gmail.com

<h2>Como ejecutar con docker</h2>
<ol>
	<li>Clonar el proyecto rama master</li>
	<li>Renombrar el archivo _env a .env e ingresar los valores</li>
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

<h2>Arquitectura del backend</h2>
<ol>
	<li>
		API Rest: node.js , exoress , mysql
	</li>
	
	<li>
		Test: mocha, supertest
	</li>
</ol>
<h2>localhost:3001/registrar-compra</h2>
<code>
{ "idproducto": 1,
  "cantidad": 2,
  "fecha":"2021-08-01"
}
</code>

<h2>localhost:3001/registrar-venta</h2>
<code>
{ "idproducto": 1,
  "cantidad": 5,
  "fecha":"2021-08-01"
}
</code>

<h2>localhost:3001/products</h2>
Consulta de stock de productos

