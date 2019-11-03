var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var server = require('../app');  
var chaiHttp = require('chai-http');  
chai.use(chaiHttp);     

suite('API health', function(){
  test('GET /health',  function(done){  
    chai.request(server)             
     .get('/health')        
     .end(function(err, res){        
       assert.equal(res.status, 200, 'response status should be 200');
       assert.equal(res.type, 'application/json', 'Response type should be application/json');
       assert.equal(res.body, 'OK', 'Response body  should be OK');
       done();
     });
 });
})

suite('Ordenes API Tests', function() {
        
      //ORDENES INDEX
      test('Ordenes Index',  function(done){  
         chai.request(server)             
          .get('/ordenes')        
          .end(function(err, res){        
            assert.equal(res.status, 200, 'response status should be 200');
            assert.equal(res.type, 'application/json', 'Response type should be application/json');
            assert.isArray(res.body, 'Response Body should be an Array');
            if(res.body.length > 0){
              var ordenes = res.body
              ordenes.forEach(element => {
                assert.isArray(element.items, 'Order Items should be of type Array');
                assert.isString(element.canal, 'Orden Canal should be string');
                assert.isNumber(element.valor, 'Orden Valor should be Number');
                assert.isNumber(element.descuento, 'Orden Descuento should be Number');
                expect(element.estado, 'Orden estado should be one of Reservada', 
                 + 'Pendiente, En tránsito, Lista para recoger,' 
                 + 'Cerrada, Cancelada').to.be.oneOf(['Reservada', 'Pendiente',
                  'En tránsito','Lista para recoger', 'Cerrada', 'Cancelada']);
                expect(element.tipo_de_entrega, 'Orden tipo de entrega should'  
                  + 'be one of Estandar, Express').to.be.oneOf(['Estandar', 'Express']);
                expect(element.tipo_de_envio, 'Orden tipo de envio should'  
                  + 'be one of Entrega en Tienda, Entrega en domicilio').to.be.oneOf(
                    ['Entrega en tienda', 'Entrega en domicilio']);
              });
              done();
            }
          });
        });
        //ORDENES INDEX

        //ORDENES CREATE
        test('Orden Create',  function(done){  
          const orden = 
          {
            "canal": "Ropa", 
            "estado": "Pendiente",
            "valor": 900,
            "descuento": 0.20,
            "tipo_de_entrega": "Express",
            "tipo_de_envio": "Entrega en tienda",
            "items":[
              {
                "sku": "1234",
                "nombre": "Camiseta",
                "cantidad": 10,
                "precio": 100,
                "codigo_de_barra": 1234
              },
              {
                "sku": "2345",
                "nombre": "Pantalón",
                "cantidad": 10,
                "precio": 100,
                "codigo_de_barra": 2345
              },
              {
                "sku": "12345",
                "nombre": "Gorra",
                "cantidad": 10,
                "precio": 100,
                "codigo_de_barra": 12334
              }
            ]	
         }
          chai.request(server)             
           .post('/ordenes')      
           .send(orden)  
           .end(function(err, res){        
             assert.equal(res.status, 201, 'response status should be 201');
             assert.equal(res.type, 'application/json', 'Response type should be application/json');
             assert.isObject(res.body, 'Response Body should be an Object');
             assert.isArray(res.body.items, 'Order Items should be of type Array');
             assert.equal(res.body.canal, orden.canal, 'Orden Canal should match body');
             assert.equal(res.body.valor, orden.valor, 'Orden Valor should match body');
             assert.equal(res.body.descuento, orden.descuento, 'Orden Descuento should match body');
             assert.equal(res.body.estado, orden.estado, 'Orden Estado should match body');
             assert.equal(res.body.tipo_de_entrega, orden.tipo_de_entrega, 'Orden Tipo de entrega should match body');
             assert.equal(res.body.tipo_de_envio, orden.tipo_de_envio, 'Orden Tipo de Envío should match body');
             res.body.items.forEach((element, index)=>{
              assert.equal(element.sku, orden.items[index].sku, 'Orden Item SKU should match body');
              assert.equal(element.nombre, orden.items[index].nombre, 'Orden Item nombre should match body');
              assert.equal(element.cantidad, orden.items[index].cantidad, 'Orden Item cantidad should match body');
              assert.equal(element.precio, orden.items[index].precio, 'Orden item precio should match body');
              assert.equal(element.codigo_de_barra, orden.items[index].codigo_de_barra, 'Orden item código de barra should match body');
             })             
             done();
           });
          });
        //ORDENES CREATE

        //ORDENES SHOW
        test('Test Orden Show',  function(done){ 
          const orden = {
           "canal": "Ropa", 
           "estado": "Pendiente",
           "valor": 900,
           "descuento": 0.20,
           "tipo_de_entrega": "Express",
           "tipo_de_envio": "Entrega en tienda",
           "items":[
             {
               "sku": "1234",
               "nombre": "Camiseta",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 1234
             },
             {
               "sku": "2345",
               "nombre": "Pantalón",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 2345
             },
             {
               "sku": "12345",
               "nombre": "Gorra",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 12334
             }
            ]	
          }
          chai.request(server)  
          .post('/ordenes')  
          .send(orden)          
          .end(function(err, res){ 
            const ordenId = res.body._id;
            chai.request(server)  
            .get(`/ordenes/${ordenId}`) 
            .end(function(err, res){
              assert.equal(res.status, 200, 'response status should be 200');
              assert.equal(res.type, 'application/json', 'Response type should be application/json');
              assert.isObject(res.body, 'Response Body should be an Object');
              assert.equal(res.body.canal, orden.canal, 'Orden Canal should match body');
              assert.equal(res.body.valor, orden.valor, 'Orden Valor should match body');
              assert.equal(res.body.descuento, orden.descuento, 'Orden Descuento should match body');
              assert.equal(res.body.estado, orden.estado, 'Orden Estado should match body');
              assert.equal(res.body.tipo_de_entrega, orden.tipo_de_entrega, 'Orden Tipo de entrega should match body');
              assert.equal(res.body.tipo_de_envio, orden.tipo_de_envio, 'Orden Tipo de Envío should match body');
              res.body.items.forEach((element, index)=>{
                assert.equal(element.sku, orden.items[index].sku, 'Orden Item SKU should match body');
                assert.equal(element.nombre, orden.items[index].nombre, 'Orden Item nombre should match body');
                assert.equal(element.cantidad, orden.items[index].cantidad, 'Orden Item cantidad should match body');
                assert.equal(element.precio, orden.items[index].precio, 'Orden item precio should match body');
                assert.equal(element.codigo_de_barra, orden.items[index].codigo_de_barra, 'Orden item código de barra should match body');
              })
            }, (err)=> console.log(err)) 
            done();  
         }, (err)=> console.log(err));
     });

        //ORDENES SHOW

        //ORDENES UPDATE
        test('Test Orden Update',  function(done){ 
          const orden = {
           "canal": "Ropa", 
           "estado": "Pendiente",
           "valor": 900,
           "descuento": 0.20,
           "tipo_de_entrega": "Express",
           "tipo_de_envio": "Entrega en tienda",
           "items":[
             {
               "sku": "1234",
               "nombre": "Camiseta",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 1234
             },
             {
               "sku": "2345",
               "nombre": "Pantalón",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 2345
             },
             {
               "sku": "12345",
               "nombre": "Gorra",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 12334
             }
            ]	
          }
          chai.request(server)  
          .post('/ordenes')  
          .send(orden)          
          .end(function(err, res){ 
            const ordenId = res.body._id;
            const updateFields = {
              "estado":"Reservada",
              "valor": 1
              }
            chai.request(server)  
            .put(`/ordenes/${ordenId}`) 
            .send(updateFields)
            .end(function(err, res){
              assert.equal(res.status, 200, 'response status should be 200');
              assert.equal(res.type, 'application/json', 'Response type should be application/json');
              assert.isObject(res.body, 'Response Body should be an Object');
              assert.equal(res.body.valor, updateFields.valor, 'Orden Valor should match body');
              assert.equal(res.body.estado, updateFields.estado, 'Orden Estado should match body');
              assert.equal(res.body.canal, orden.canal, 'Orden Canal should match body');
              assert.equal(res.body.descuento, orden.descuento, 'Orden Descuento should match body');
              assert.equal(res.body.tipo_de_entrega, orden.tipo_de_entrega, 'Orden Tipo de entrega should match body');
              assert.equal(res.body.tipo_de_envio, orden.tipo_de_envio, 'Orden Tipo de Envío should match body');
              res.body.items.forEach((element, index)=>{
                assert.equal(element.sku, orden.items[index].sku, 'Orden Item SKU should match body');
                assert.equal(element.nombre, orden.items[index].nombre, 'Orden Item nombre should match body');
                assert.equal(element.cantidad, orden.items[index].cantidad, 'Orden Item cantidad should match body');
                assert.equal(element.precio, orden.items[index].precio, 'Orden item precio should match body');
                assert.equal(element.codigo_de_barra, orden.items[index].codigo_de_barra, 'Orden item código de barra should match body');
              })
            }) 
            done();  
         });
     });
        //ORDENES UPDATE

        //ORDENES ITEMS INDEX
        test('Test Orden item Index',  function(done){ 
          const orden = {
           "canal": "Ropa", 
           "estado": "Pendiente",
           "valor": 900,
           "descuento": 0.20,
           "tipo_de_entrega": "Express",
           "tipo_de_envio": "Entrega en tienda",
           "items":[
             {
               "sku": "1234",
               "nombre": "Camiseta",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 1234
             },
             {
               "sku": "2345",
               "nombre": "Pantalón",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 2345
             },
             {
               "sku": "12345",
               "nombre": "Gorra",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 12334
             }
            ]	
          }
          chai.request(server)  
          .post('/ordenes')  
          .send(orden)          
          .end(function(err, res){ 
            const ordenId = res.body._id;
            chai.request(server)  
            .get(`/ordenes/${ordenId}/items`) 
            .end(function(err, res){
              assert.equal(res.status, 200, 'response status should be 200');
              assert.equal(res.type, 'application/json', 'Response type should be application/json');
              assert.isArray(res.body, 'Response Body should be an Array');
              res.body.forEach((element, index)=>{
                assert.equal(element.sku, orden.items[index].sku, 'Orden Item SKU should match body');
                assert.equal(element.nombre, orden.items[index].nombre, 'Orden Item nombre should match body');
                assert.equal(element.cantidad, orden.items[index].cantidad, 'Orden Item cantidad should match body');
                assert.equal(element.precio, orden.items[index].precio, 'Orden item precio should match body');
                assert.equal(element.codigo_de_barra, orden.items[index].codigo_de_barra, 'Orden item código de barra should match body');
              })
            }) 
            done();  
         });
     });
        //ORDENES ITEMS INDEX

        //ORDENES ITEMS CREATE
        test('Test Orden item Create',  function(done){ 
          const orden = {
           "canal": "Ropa", 
           "estado": "Pendiente",
           "valor": 900,
           "descuento": 0.20,
           "tipo_de_entrega": "Express",
           "tipo_de_envio": "Entrega en tienda",
           "items":[
             {
               "sku": "1234",
               "nombre": "Camiseta",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 1234
             },
             {
               "sku": "2345",
               "nombre": "Pantalón",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 2345
             },
             {
               "sku": "12345",
               "nombre": "Gorra",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 12334
             }
            ]	
          }
          chai.request(server)  
          .post('/ordenes')  
          .send(orden)          
          .end(function(err, res){ 
            const ordenId = res.body._id;
            const newItem =  {
              "sku": "123",
              "nombre": "Nuevo",
              "cantidad": 100,
              "precio": 99,
              "codigo_de_barra": 99
            }
            chai.request(server)  
            .post(`/ordenes/${ordenId}/items`) 
            .send(newItem)
            .end(function(err, res){
              assert.equal(res.status, 201, 'response status should be 201');
              assert.equal(res.type, 'application/json', 'Response type should be application/json');
              assert.isObject(res.body, 'Response Body should be an Object');
              assert.equal(res.body.valor, orden.valor, 'Orden Valor should match body');
              assert.equal(res.body.estado, orden.estado, 'Orden Estado should match body');
              assert.equal(res.body.canal, orden.canal, 'Orden Canal should match body');
              assert.equal(res.body.descuento, orden.descuento, 'Orden Descuento should match body');
              assert.equal(res.body.tipo_de_entrega, orden.tipo_de_entrega, 'Orden Tipo de entrega should match body');
              assert.equal(res.body.tipo_de_envio, orden.tipo_de_envio, 'Orden Tipo de Envío should match body');
              assert.equal(res.body.items.length, orden.items.length + 1, 'Orden items should have 1 new element');
              const addedItem = res.body.items[res.body.items.length - 1]
              assert.equal(addedItem.sku, newItem.sku, 'Orden Item SKU should match original orden');
              assert.equal(addedItem.nombre, newItem.nombre, 'Orden Item nombre should match original orden');
              assert.equal(addedItem.cantidad, newItem.cantidad, 'Orden Item cantidad should match original orden');
              assert.equal(addedItem.precio, newItem.precio, 'Orden item precio should match original orden');
              assert.equal(addedItem.codigo_de_barra, newItem.codigo_de_barra, 'Orden item código de barra should match original orden');
              res.body.items.pop();
              res.body.items.forEach((element, index)=>{
                assert.equal(element.sku, orden.items[index].sku, 'Orden Item SKU should match original orden');
                assert.equal(element.nombre, orden.items[index].nombre, 'Orden Item nombre should match original orden');
                assert.equal(element.cantidad, orden.items[index].cantidad, 'Orden Item cantidad should match original orden');
                assert.equal(element.precio, orden.items[index].precio, 'Orden item precio should match original orden');
                assert.equal(element.codigo_de_barra, orden.items[index].codigo_de_barra, 'Orden item código de barra should match original orden');
              })              
            }) 
            done();  
         });
     });
        //ORDENES ITEMS CREATE

        //ORDENES ITEMS DELETE
        test('Test Orden item Delete',  function(done){ 
          const orden = {
           "canal": "Ropa", 
           "estado": "Pendiente",
           "valor": 900,
           "descuento": 0.20,
           "tipo_de_entrega": "Express",
           "tipo_de_envio": "Entrega en tienda",
           "items":[
             {
               "sku": "1234",
               "nombre": "Camiseta",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 1234
             },
             {
               "sku": "2345",
               "nombre": "Pantalón",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 2345
             },
             {
               "sku": "12345",
               "nombre": "Gorra",
               "cantidad": 10,
               "precio": 100,
               "codigo_de_barra": 12334
             }
            ]	
          }
          chai.request(server)  
          .post('/ordenes')  
          .send(orden)          
          .end(function(err, res){ 
            function getRandomInt(max) {
              return Math.floor(Math.random() * Math.floor(max));
            }
            const itemIndex = getRandomInt(res.body.items.length)
            const ordenId = res.body._id;
            const itemId = res.body.items[itemIndex]._id
            chai.request(server)  
            .delete(`/ordenes/${ordenId}/items/${itemId}`) 
            .end(function(err, res){
              assert.equal(res.status, 200, 'response status should be 200');
              assert.equal(res.type, 'application/json', 'Response type should be application/json');
              assert.isObject(res.body, 'Response Body should be an Object');
              assert.equal(res.body.valor, orden.valor, 'Orden Valor should match body');
              assert.equal(res.body.estado, orden.estado, 'Orden Estado should match body');
              assert.equal(res.body.canal, orden.canal, 'Orden Canal should match body');
              assert.equal(res.body.descuento, orden.descuento, 'Orden Descuento should match body');
              assert.equal(res.body.tipo_de_entrega, orden.tipo_de_entrega, 'Orden Tipo de entrega should match body');
              assert.equal(res.body.tipo_de_envio, orden.tipo_de_envio, 'Orden Tipo de Envío should match body');
              assert.equal(res.body.items.length, orden.items.length - 1, 'Orden items should have 1 element less');
              orden.items.splice(itemIndex, 1);
              res.body.items.forEach((element, index)=>{
                assert.equal(element.sku, orden.items[index].sku, 'Orden Item SKU should match original orden');
                assert.equal(element.nombre, orden.items[index].nombre, 'Orden Item nombre should match original orden');
                assert.equal(element.cantidad, orden.items[index].cantidad, 'Orden Item cantidad should match original orden');
                assert.equal(element.precio, orden.items[index].precio, 'Orden item precio should match original orden');
                assert.equal(element.codigo_de_barra, orden.items[index].codigo_de_barra, 'Orden item código de barra should match original orden');
                assert.notEqual(element._id, itemId, 'Orden item Id flagged for deletion should not exist in array');
              })
            }) 
            done();  
         });
     });
        //ORDENES ITEMS DELETE
          

  });



