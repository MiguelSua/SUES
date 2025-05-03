const { Sequelize, DataTypes } = require('sequelize');

// Single database connection configuration
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { 
    ssl: { 
      require: true,
      rejectUnauthorized: false 
    } 
  }
});

// Single model definition
const Pedido = sequelize.define('Pedido', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  servicio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaHora: {  // Consistent naming (camelCase)
    type: DataTypes.DATE,  // Changed to DATE for proper date handling
    allowNull: false
  }
});

module.exports = { sequelize, Pedido };