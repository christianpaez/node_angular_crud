var chai = require('chai');
var assert = chai.assert;
var server = require('../app');  
var chaiHttp = require('chai-http');  
chai.use(chaiHttp);     

suite('API health', function(){
  test('GET /health',  function(done){  
    chai.request(server)             
     .get('/ordenes')        
     .end(function(err, res){        
       assert.equal(res.status, 200, 'response status should be 200');
       assert.equal(res.type, 'application/json', 'Response type should be application/json');
       assert.equal(res.body, 'OK', 'Response body  should be OK');
       done();
     });
 });
})

suite('Ordenes API Tests', function() {
        
    suite('GET /ordenes', function(){
      test('Ordenes Index',  function(done){  
         chai.request(server)             
          .get('/ordenes')        
          .end(function(err, res){        
            assert.equal(res.status, 200, 'response status should be 200');
            assert.equal(res.type, 'application/json', 'Response type should be application/json');
            done();
          });
      });
      
      /** Ready to have a try ?
       * Replace assert.fail(). Make the test pass. **/
       
      // If no name is passed, the endpoint responds with 'hello Guest'.
      test('Test GET /hello with no name',  function(done){ // Don't forget the callback...
         chai.request(server)             // 'server' is the Express App
          .get('/hello')                  // http_method(url). NO NAME in the query !
          .end(function(err, res){        // res is the response object
          
            // Test the status and the text response (see the example above). 
            // Please follow the order -status, -text. We rely on that in our tests.
            // It should respond 'Hello Guest'
            assert.fail(res.status, 200);
            assert.fail(res.text, 'hello Guest');
            done();   // Always call the 'done()' callback when finished.
          });
      });

      /**  Another one... **/
      test('Test GET /hello with your name',  function(done){ // Don't forget the callback...
         chai.request(server)             // 'server' is the Express App
          .get('/hello?name=xy_z') /** <=== Put your name in the query **/ 
          .end(function(err, res){        // res is the response object
          
            // Your tests here.
            // Replace assert.fail(). Make the test pass.
            // Test the status and the text response. Follow the test order like above.
            assert.fail(res.status, 200);
             assert.fail(res.text, 'hello xy_z'/** <==  Put your name here **/);
            done();   // Always call the 'done()' callback when finished.
          });
      });

    });

    // In the next example we'll see how to send data in a request payload (body).
    // We are going to test a PUT request. The '/travellers' endpoint accepts
    // a JSON object taking the structure :
    // {surname: [last name of a traveller of the past]} ,
    // The endpoint responds with :
    // {name: [first name], surname:[last name], dates: [birth - death years]}
    // see the server code for more details.
    
    // ### EXAMPLE ### 
    suite('PUT /travellers', function(){
      test('#example - responds with appropriate JSON data when sending {surname: "Polo"}',  function(done){
         chai.request(server)
          .put('/travellers')         // note the PUT method
          .send({surname: 'Polo'})    // attach the payload, encoded as JSON
          .end(function(err, res){    // Send the request. Pass a Node callback

            assert.equal(res.status, 200, 'response status should be 200');
            assert.equal(res.type, 'application/json', "Response should be json");
            
            // res.body contains the response parsed as a JS object, when appropriate
            // (i.e the response type is JSON)
            assert.equal(res.body.name, 'Marco', 'res.body.name should be "Marco"');
            assert.equal(res.body.surname, 'Polo', 'res.body.surname should be "Polo"' );
            
            // call 'done()' when... done
            done();
          });
      });

      /** Now it's your turn. Make the test pass. **/
      // We expect the response to be
      // {name: 'Cristoforo', surname: 'Colombo', dates: '1451 - 1506'}
      // check the status, the type, name and surname.
      
      // !!!! Follow the order of the assertions in the preceding example!!!!, 
      // we rely on it in our tests.
      
      test('send {surname: "Colombo"}',  function(done){
       
       // we setup the request for you...
       chai.request(server)
        .put('/travellers')
        /** send {surname: 'Colombo'} here **/
        // .send({...})
        .end(function(err, res){
          
          /** your tests here **/
          assert.fail(); // remove this after adding tests
          
          done(); // Never forget the 'done()' callback...
        });
      });

      /** Repetition is the mother of learning. **/
      // Try it again. This time without help !!
      test('send {surname: "da Verrazzano"}', function(done) {
        /** place the chai-http request code here... **/
        
        /** place your tests inside the callback **/
        
        assert.fail(); // remove this after adding tests
        done();
      
    });

  });

  // In the next challenges we are going to simulate the human interaction with
  // a page using a device called 'Headless Browser'. A headless browser is a web
  // browser without a graphical user interface. These kind of tools are
  // particularly useful for testing web pages as they are able to render
  // and understand HTML, CSS, and JavaScript the same way a browser would.

  // For these challenges we are using [Zombie.Js](http://zombie.js.org/)
  // It's a lightweight browser which is totally based on JS, without relying on
  // additional binaries to be installed. This feature makes it usable in
  // an environment such as Gomix. There are many other (more powerful) options.


    });
