// Use the MariaDB Node.js Connector
const mariadb = require('mariadb');
 
// Create a connection pool
const pool = 
      mariadb.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER, 
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE
    });
    
pool.getConnection((err,connection) => 
{
  if (err.code === 'PROTOCOL_CONECTION_LOST')
  {
    console.log("Conection with database lost.");
  }
  else if (err.code === 'ER_ACCESS_DENIED_ERROR')
  {
    console.log("Conection refused.");
  }
  else if (err.code === 'ER_GET_CONNECTION_TIMEOUT')
  {
    console.log("Conection timeout.");
  }
  
  if (connection)
  {
    connection.release();
  }
  
  return;
})

module.exports = pool;
