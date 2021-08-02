 module.exports={
    user: process.env.MYSQL_USER || "root",
    host: process.env.MYSQL_HOST || "localhost",
    password: process.env.MYSQL_ROOT_PASSWORD || "",
    database: process.env.MYSQL_DB || "test",
    port: process.env.MYSQL_PORT || "3306"
  };