var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));


app.get("/", function (req, res)
{
    res.sendFile(__dirname + "/" + 'index.html');
});

app.get("/react.js", function(req, res)
{
    res.sendFile(__dirname + "/" + 'react.js');
});

app.get("/styles.css", function(req, res)
{
    res.sendFile(___dirname + "/" + "styles.css");
});

app.listen(port, function()
{
    console.log("Listening on port " + port);
});