const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')

// setting the ejs engine to run the dynamic html file or ejs file 
app.set('view engine','ejs');

// express parsers
app.use(express.json()); // to convert the response into the json format
app.use(express.urlencoded({  
    extended: true
}))

// setting up the static files 
app.set(express.static(path.join(__dirname,"public")))

// dynamic rendering the ejs file 
app.get("/", function(req,res){
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files})
    })
})

app.get('/files/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err, filedata){
        res.render('show',{filename: req.params.filename , filedata: filedata})
    })
})

app.post('/create', function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, function(err){
        res.redirect('/');
    })
})

app.listen(3000);