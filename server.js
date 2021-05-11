const express = require("express")
const handlebars = require("express-handlebars")

const app = express()
app.set("port", 62861)
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.get('/', function(req, res){
    let qParams = []
    
    for (let p in req.query){
        qParams.push({"name": p, "value": req.query[p]})
    }
    
    let data = {}
    data.items = qParams
    data.request_type = "Get"
    res.render("home", data)
})

app.post('/', function(req, res){
    let bodyParams = []
    let qParams = []
    for (let p in req.body){
        bodyParams.push({"name": p, "value": req.body[p]}) 
    }
    for (let p in req.query){
        qParams.push({"name": p, "value": req.query[p]}) 
    }
    
    let data = {}
    data.items = qParams
    data.items2 = bodyParams
    data.request_type = "Post"
    console.log(data)
    res.render("home", data)
})


app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('Error: Status Code 500');
  });




app.listen(app.get('port'))