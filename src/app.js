const express = require('express')
const path = require('path')
const hbs = require('hbs')

console.log(__dirname);
console.log(__filename);
console.log();

//Defines path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const app = express()

//Setup handle bar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About us'
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        msg: 'Help!!!!!',
        title: 'Help!'
    })
})
app.listen(3000, ()=> {
    console.log("Server is up on port 3000");
})