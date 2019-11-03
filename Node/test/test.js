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
        
      test('Ordenes Index',  function(done){  
         chai.request(server)             
          .get('/ordenes')        
          .end(function(err, res){        
            assert.equal(res.status, 200, 'response status should be 200');
            assert.equal(res.type, 'application/json', 'Response type should be application/json');
            assert.isArray(res.body, 'Response Body should be an Array');
            done();
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
            }
          });

          test('Orden Create',  function(done){  
            chai.request(server)             
             .post('/ordenes')      
             .send({
              
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
             })  
             .end(function(err, res){        
               assert.equal(res.status, 200, 'response status should be 200');
               assert.equal(res.type, 'application/json', 'Response type should be application/json');
               assert.isObject(res.body, 'Response Body should be an Object');
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
               done();
             });
            });

          
      
      
      /* test('Test GET /hello with no name',  function(done){ 
         chai.request(server)             
          .get('/hello')                
          .end(function(err, res){       
          
            assert.fail(res.status, 200);
            assert.fail(res.text, 'hello Guest');
            done();  
          });
      }); */

      /* test('Test GET /hello with your name',  function(done){ 
         chai.request(server)      
          .get('/hello?name=xy_z')  
          .end(function(err, res){ 
          
           assert.fail(res.status, 200);
             assert.fail(res.text, 'hello xy_z');
            done();             });
      }); 

    });*/

   
    /* suite('PUT /travellers', function(){
      test('#example - responds with appropriate JSON data when sending {surname: "Polo"}',  function(done){
         chai.request(server)
          .put('/travellers')        
          .send({surname: 'Polo'})    
          .end(function(err, res){    
            

            assert.equal(res.status, 200, 'response status should be 200');
            assert.equal(res.type, 'application/json', "Response should be json");
            
            assert.equal(res.body.name, 'Marco', 'res.body.name should be "Marco"');
            assert.equal(res.body.surname, 'Polo', 'res.body.surname should be "Polo"' );
            
            done();
          });
      }); */

    
      
     /*  test('send {surname: "Colombo"}',  function(done){
       
       chai.request(server)
        .put('/travellers')
        .end(function(err, res){
          
          assert.fail();
          
          done();
        });
      }); */

      /* test('send {surname: "da Verrazzano"}', function(done) {
        
        assert.fail();
        done();
      
    }); */

  });



    });
