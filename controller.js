var Model = require('./model');

var Controler = {
   create: function(res, req){
      var dados = {
        name: "Skol",
        description: "Mijo de rato",
        alcohol: 4.5,
        price: 3.0,
        category: "pilsen"
     };

     var model = new Model(dados);
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

     Model.update(query, mod, optional, function(err, data){
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

      Model.find(query, function(err, data){
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

      Model.remove(query, function(err, data){
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

module.exports = Controler;