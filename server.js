require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, Pedido } = require('./models/Pedido');

// Inicializa la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Configuración de middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta GET /pedidos CORREGIDA
app.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      order: [['fechaHora', 'DESC']]
    });
    res.json(pedidos);
  } catch (error) {
    console.error('Error en GET /pedidos:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Ruta POST /pedidos
app.post('/pedidos', async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    console.error('Error en POST /pedidos:', error);
    res.status(500).json({ error: 'Error al crear pedido' });
  }
});

// Inicia el servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // ¡Cuidado! Esto borra y recrea las tablas
    
    app.listen(port, () => {
      console.log(`🚀 Servidor funcionando en puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar:', error);
    process.exit(1);
  }
}

startServer();