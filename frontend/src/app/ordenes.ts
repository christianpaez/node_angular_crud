export class Orden {
    _id: string;
    canal: string;
    valor: number;
    descuento: number;
    tipo_de_entrega: tipo_de_entrega;
    tipo_de_envio: tipo_de_envio;
    estado: estado;
    items: [];
    createdAt: Date;
}

enum tipo_de_entrega {
    'Estandar', 
    'Express'
}
enum tipo_de_envio {
    'Entrega en tienda',
    'Entrega en domicilio'
}
enum estado {
    'Reservada',
    'Pendiente', 
    'En tránsito',
    'Lista para recoger', 
    'Cerrada', 
    'Cancelada'
}