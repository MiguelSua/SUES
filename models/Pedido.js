const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false
});

const Pedido = sequelize.define('Pedido', {
  nombre: DataTypes.STRING,
  telefono: DataTypes.STRING,
  servicio: DataTypes.STRING,
  fechaHora: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false, // ¡IMPORTANTE!
  createdAt: false,  // ¡EXPLÍCITO!
  updatedAt: false,  // ¡EXPLÍCITO!
  tableName: 'Pedidos',
  freezeTableName: true
});

// Función de inicialización CONFIRMADA
async function startDB() {
  await sequelize.authenticate();
  await Pedido.sync({ force: true }); // Borra y recrea la tabla
  console.log('✅ Base de datos lista');
}

module.exports = { sequelize, Pedido, startDB };