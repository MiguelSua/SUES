require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, Pedido } = require('./models/Pedido');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/pedidos', async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json({ mensaje: 'Pedido recibido', pedido });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el pedido' });
  }
});

app.get('/pedidos', async (req, res) => {
  const pedidos = await Pedido.findAll({ order: [['createdAt', 'DESC']] });
  res.json(pedidos);
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});
