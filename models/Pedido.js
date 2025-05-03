const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

const Pedido = sequelize.define('Pedido', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING, allowNull: false },
  servicio: { type: DataTypes.STRING, allowNull: false },
  fechaHora: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { sequelize, Pedido };
