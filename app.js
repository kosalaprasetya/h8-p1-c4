const express = require('express');
const router = require('./routes/index.js');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extends: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
