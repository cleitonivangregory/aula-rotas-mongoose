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

var Beer = (mongoose.model('Beer', new Schema(json_schema)));
module.exports = Beer;
