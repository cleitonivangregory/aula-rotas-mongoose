var http = require('http');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pos-unoesc');

var db = mongoose.connection;
db.on('error', function(err){
	console.log('Erro de conexao: ', err);
});
db.on('open', function(){
	console.log('Conexao aberta');
});
db.on('connected', function(err){
	console.log('conectado!');
});
db.on('disconnected', function(){
	console.log('desconectado.');
});

var Schema = mongoose.Schema;

var json_schema = {
	name: {type: String, default: ''},
	description: {type: String, default: ''},
	alcohol: {type: Number, min: 0},
	price: {type: Number, min: 0},
	category: {type: String, default: ''},
	created_at: {type: Date, default: Date.now}
}
var BeerSchema = new Schema(json_schema);
var Beer = mongoose.model('Beer', BeerSchema);

var Controler = {
   create: function(res, req){
      var dados = {
        name: "Skol",
        description: "Mijo de rato",
        alcohol: 4.5,
        price: 3.0,
        category: "pilsen"
     };

     var model = new Beer(dados);
     model.save(function(err, data){
        if (err){
          console.log('Erro: ', err);
            msg = 'Erro' + err;
        } else {
            console.log('gravou cerveja: ', data);
            msg = 'gravou cerveja: ' + data;
       }
      res.write(msg);
      res.end();
     });
   },
   update: function(res, req){
     var query = {name: /skol/i};
     var mod = {
         name: "Brahma",
        alcohol: 4,
        price: 6,
        category: "pilsen"
     }
     var optional = {
         upset: false,
        mult: true
     }

     Beer.update(query, mod, optional, function(err, data){
      if (err){
         console.log("erro", err);
         msg = 'Erro:' + err;
      } else {
         console.log("update", data);
         msg = 'update' + data;
      }
      res.write(msg);
      res.end();
     });
   },
   retrieve: function(res, req){
      var query = {};

      Beer.find(query, function(err, data){
         if (err){
         console.log("erro", err);
         msg = 'erro: ' + err;
         } else {
            console.log("Listagem: ", data);
            msg = 'Listagem:' + data;
         }
         res.write(msg);
         res.end();
      });
   },
   del: function(res, req){
      var query = {name: /brahma/i};

      Beer.remove(query, function(err, data){
         if (err){
            console.log("erro", err);
            msg = 'erro: ' + err;
         } else {
            console.log("Deletado com sucesso.", data);
            msg = 'Deletado com sucesso.' + data;
         }
         res.write(msg);
         res.end();
       });
   }
};   

http.createServer(function (req, res) {
   var msg = '';

   res.writeHead(200, {'Content-Type': 'text/html'});
	var url = req.url;
   switch (url)
   {
      case "/beers/create":{
         Controler.create(res, req);
         break;
      }
      case "/beers/update":{
         Controler.update(res, req);
         break;
      }
      case "/beers/retrieve":{
         Controler.retrieve(res, req);
         break;
      }
      case "/beers/delete":{
         Controler.del(res, req);
         break;
      }
      default:
      {
         res.write("Home!");
         res.end();
         break;
      }
   }
}).listen(3000);

console.log('Server running at http://localhost:3000/');