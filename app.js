var http = require('http');


var Controler = require("./controller.js");
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