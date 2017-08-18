var express = require('express')
var app = express()

app.use(express.static('./dist'))

app.get('/',function(req, res){
  res.send('Hello')
})

app.listen(2333)