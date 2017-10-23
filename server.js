var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var exphbs = require("express-handlebars");
var methodOverride = require('method-override');
var path = require("path");
var connection;


var app = express();
//app.use(express.static(process.cwd() + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(methodOverride('_method'));

// app.use(express.static('public'));
// app.use(express.static('files'))





if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.envJAWSDB_URL);
} else{
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Insecure',
    database: 'burger_db'
  });
};

connection.connect();
module.exports = connection;
// connection.connect(function(err) {
//   if (err) {
//     console.log("error connection" + err.stack);
//     return;
//   }
//   console.log("connected as id" + connection.threadId);
// });

app.get("/", function(req, res) {
      connection.query("SELECT * FROM orders;", function(err, data) {
        if (err) {
          throw err;
        }
        res.render("index", {orders: data});
      });
  });

app.post("/", function(req, res) {
  connection.query("INSERT INTO orders (hamburgerorder) VALUES (?)", [req.body.hamburgerorder], function(err, result) {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
});

app.put("/:id", function(req, res) {
  connection.query("UPDATE orders SET devoured = true WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
    res.redirect("/");
  });
});

app.listen(port);
