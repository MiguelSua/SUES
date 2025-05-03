const { Sequelize, DataTypes } = require('sequelize');

// Configuración de conexión a PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { 
    ssl: { 
      require: true,
      rejectUnauthorized: false 
    } 
  },
  logging: false // Desactiva los logs de SQL en consola
});

// Definición del modelo Pedido
const Pedido = sequelize.define('Pedido', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Validación adicional
    }
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  fechaHora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW // Valor por defecto
  }
}, {
  timestamps: false // Desactiva createdAt y updatedAt
});

module.exports = { sequelize, Pedido };