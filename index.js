var express = require('express');
var app = express();
var fs = require("fs");
const { Client, ID, Users, Databases,Query } = require('node-appwrite');
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('6579d789e407b4fb2461')                
.setKey('38ea00bcacc48de00a4fcabceeb9a092dc0050109ec9006ac3409cd930023a08098985fb16c8f757bb40920b859585115944c6cd7caa7534bc8a98c3bf0b4d3f128b9bb859f69238ac8b8059c8161d9ea1d27a8bf34df11b9e767c9d47d8398c48f7568bdfb88e22b44a224f7f0c818ab620aa5ddd60edf572cbab7a1586f453a2cae8279abb7816a0ebab0f26daaca97c95f189');     
const databases = new Databases(client);
app.get('/:ticker/:coi/:poi/:toi/:cv/:pv/:tv', function (req, res) {
  console.log("GOT")
  ticker = req.params.ticker
  coi = req.params.coi
  poi = req.params.poi
  toi = req.params.toi
  cv = req.params.cv
  pv = req.params.pv
  tv = req.params.tv
  console.log(req.params.coi)
  console.log(req.params.poi)
  var date = new Date(Date.now());
  date = date.toLocaleString('en-US', {
    timeZone: 'America/Chicago'
  })
  const createreq =
            databases.createDocument('657b88927e9f558c584e',   
                             '657b88a19a2856197f58',
                             ID.unique(), {'TickerSymbol':
                              ticker, 'TotalOI':
                               toi, 'CallOI':coi, 'PutOI':poi, 'TotalVolume':tv, 'CallVolume':cv, 'PutVolume':pv, 'Date':date,'API':false });
  createreq.then(function (response) {
    console.log("CREATED!")
    res.end('{"success" : "Updated Successfully", "status" : 200}');

  })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
