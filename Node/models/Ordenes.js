var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
  sku: String,
  nombre: String, 
  cantidad: Number,
  precio: Number,
  codigo_de_barra: Number
  });

var OrderSchema = new mongoose.Schema({
  canal: String,
  valor: Number,
  descuento: Number,
  estado: {
    type:String,
    enum: ['Reservada', 'Pendiente', 'En tránsito', 
    'Lista para recoger', 'Cerrada', 'Cancelada']
  },
  tipo_de_entrega: {
    type: String,
    enum: ['Estandar', 'Express']
  },
  tipo_de_envio: {
    type: String,
    enum: ['Entrega en tienda', 'Entrega en domicilio']
  },
  items: [ItemSchema]
},{
  timestamps: true
  });

module.exports = mongoose.model('Order', OrderSchema);
