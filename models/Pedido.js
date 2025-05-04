const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { 
    ssl: { 
      require: true, 
      rejectUnauthorized: false 
    }
  },
  logging: false
});

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
  fechaHora: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false,       // Desactiva campos automáticos
  createdAt: false,        // Confirmado
  updatedAt: false,        // Confirmado  
  tableName: 'Pedidos',    // Nombre exacto de tabla
  freezeTableName: true    // Evita pluralizaciones
});

module.exports = { sequelize, Pedido };