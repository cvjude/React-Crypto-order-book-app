const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const port = process.env.PORT || 5001;
const app = express();
dotenv.config();

app.use(express.static(path.resolve(__dirname, './build')));

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build/index.html'));
  });
});