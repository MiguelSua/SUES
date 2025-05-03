const { sequelize, Pedido, startDB } = require('./models/Pedido');

// ... (configuración de Express igual)

// Ruta GET /pedidos CONFIRMADA
app.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      order: [['fechaHora', 'DESC']] // Ordena SOLO por fechaHora
    });
    res.json(pedidos);
  } catch (error) {
    console.error('Error GET /pedidos:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Inicio CONFIRMADO
async function start() {
  await startDB();
  app.listen(process.env.PORT || 3000, () => {
    console.log('🚀 Servidor funcionando');
  });
}

start().catch(err => {
  console.error('Error inicial:', err);
  process.exit(1);
});