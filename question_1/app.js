const express = require('express');
const {getDataApi} = require('./ecom_apis');

const app = express();
app.listen(1729, () => {console.log("server running in port 1729")})

app.use(express.json());

app.get("/cats/:catagory/prod", getDataApi);
