require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, Pedido } = require('./models/Pedido');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Validación inicial de la conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL establecida'))
  .catch(err => console.error('❌ Error de conexión a la DB:', err));

// Rutas
app.post('/pedidos', async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json({ 
      mensaje: 'Pedido recibido', 
      pedido 
    });
  } catch (error) {
    console.error('Error en POST /pedidos:', error);
    res.status(500).json({ 
      error: 'Error al guardar el pedido',
      detalles: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

app.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    res.json(pedidos);
  } catch (error) {
    console.error('Error en GET /pedidos:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Inicio del servidor con manejo de errores
sequelize.sync({ alter: true })  // alter: true para desarrollo, en producción usa migraciones
  .then(() => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en puerto ${port}`);
      console.log(`🔗 URL: http://localhost:${port}`);
      console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
    });

    // Manejo de errores del servidor
    server.on('error', (err) => {
      console.error('Error en el servidor:', err);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la DB:', err);
    process.exit(1);
  });

// Manejo de señales para shutdown
process.on('SIGTERM', () => {
  console.log('Recibida señal SIGTERM. Cerrando servidor...');
  server?.close();
});