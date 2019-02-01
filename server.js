const http = require('http');
const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

// Déclaration du dossier public contenant des fichiers statiques
app.use(express.static(__dirname+'/public'));

// declaration du moteur de rendu, hbs...  npm -i --save hbs
app.set('view engine','hbs');
// Enregsitrement du dossier contenant les vues partielles hbs
hbs.registerPartials(__dirname+ '/views/partials');

// Exemple de middleware
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log("Login impossible");
            
        }
    });
    // On repasse la main au chemin ciblé
    next();
})


//########Routes
app.get('/',(req,res) => {
res.send('HTML');
});

app.get('/bad',(req,res)=>{
    res.render('bad',{title:'Bad'});
})
app.listen(3000,()=>{
    console.log("Serveur connecté sur le port 30000");
    
})