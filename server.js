const express = require('express');
var path = require('path');
let router = express.Router();
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'src'));
app.use(express.static(path.join(__dirname, 'src')));

router.get('/', function(req, res, next) {
    res.sendFile(__dirname+'/src/index.html');
});

app.use('/', router);

// app.get('/', (req, res) => {
//   res.render('index')
// });

app.listen(port, () => {
  console.log(`Example app at http://localhost:${port} !`)
});