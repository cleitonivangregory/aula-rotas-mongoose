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
var query = {name: /brahma/i};

Beer.remove(query, function(err, data){
   if (err){
      console.log("erro", err);
   } else {
      console.log("Deletado com sucesso.", data);
   }
   process.exit(0);
})
