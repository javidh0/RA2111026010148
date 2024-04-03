const axios = require('axios');

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const test_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTUxNjc5LCJpYXQiOjE3MTIxNTEzNzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjcwNGJhOTk2LTI5ZGYtNGU4Yi05ODM0LWNjYmY3NTI3NTAyNiIsInN1YiI6Im1tMTYzMkBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU3JtIFVuaXZlcnNpdHksIEtUUiIsImNsaWVudElEIjoiNzA0YmE5OTYtMjlkZi00ZThiLTk4MzQtY2NiZjc1Mjc1MDI2IiwiY2xpZW50U2VjcmV0IjoiTXZtVGNYc2lwamNNSGNyRCIsIm93bmVyTmFtZSI6Ik1vaGFtbWVkIEphdmlkaCBTIiwib3duZXJFbWFpbCI6Im1tMTYzMkBzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMTExMDI2MDEwMTQ4In0.7xAoObPKihPxVw-_hjwdfuXtG4hASsO_asmLBBejQB0";

// var token = {
//     "token_type": "Bearer",
//     // "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTUxNjc5LCJpYXQiOjE3MTIxNTEzNzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjcwNGJhOTk2LTI5ZGYtNGU4Yi05ODM0LWNjYmY3NTI3NTAyNiIsInN1YiI6Im1tMTYzMkBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU3JtIFVuaXZlcnNpdHksIEtUUiIsImNsaWVudElEIjoiNzA0YmE5OTYtMjlkZi00ZThiLTk4MzQtY2NiZjc1Mjc1MDI2IiwiY2xpZW50U2VjcmV0IjoiTXZtVGNYc2lwamNNSGNyRCIsIm93bmVyTmFtZSI6Ik1vaGFtbWVkIEphdmlkaCBTIiwib3duZXJFbWFpbCI6Im1tMTYzMkBzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMTExMDI2MDEwMTQ4In0.7xAoObPKihPxVw-_hjwdfuXtG4hASsO_asmLBBejQB0",
//     "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTUzMDUxLCJpYXQiOjE3MTIxNTI3NTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjcwNGJhOTk2LTI5ZGYtNGU4Yi05ODM0LWNjYmY3NTI3NTAyNiIsInN1YiI6Im1tMTYzMkBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU3JtIFVuaXZlcnNpdHksIEtUUiIsImNsaWVudElEIjoiNzA0YmE5OTYtMjlkZi00ZThiLTk4MzQtY2NiZjc1Mjc1MDI2IiwiY2xpZW50U2VjcmV0IjoiTXZtVGNYc2lwamNNSGNyRCIsIm93bmVyTmFtZSI6Ik1vaGFtbWVkIEphdmlkaCBTIiwib3duZXJFbWFpbCI6Im1tMTYzMkBzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMTExMDI2MDEwMTQ4In0.HWUqRjneIwn9HPvu7q9nNEUIWlq73ApDOPhb-YRy5LE",
//     "expires_in": 1712153051
// };

var token = {};

var clientId = {
    "companyName": "Srm University, KTR",
    "clientID": "704ba996-29df-4e8b-9834-ccbf75275026",
    "clientSecret": "MvmTcXsipjcMHcrD",
    "ownerName": "Mohammed Javidh S",
    "ownerEmail": "mm1632@srmist.edu.in",
    "rollNo": "RA2111026010148"
};

function idGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4());
}

async function getBearerToken(){
    const authApi = "http://20.244.56.144/test/auth";
    if(!token["access_token"] || new Date(token['expires_in']) >= new Date()){
        let token_raw = await axios.post(authApi, clientId);
        token = token_raw.data;
        console.log("new token");
        console.log(token);
    }
    return token["access_token"];
}

// http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=3&minPrice=1&maxPrice=10000

async function getDataApi(req, res){
    let catagory = req.params.catagory;
    let nProduct = req.query.nProduct;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let sort = req.body.sort;

    const b_token = await getBearerToken();
    const headers = { 'Authorization': `Bearer ${b_token}` }; 

    let response_tr = [];

    for(var i=0; i<companies.length; i++){
        const api = `http://20.244.56.144/test/companies/${companies[i]}/categories/${catagory}/products?top=${nProduct}&minPrice=${minPrice}&maxPrice=${maxPrice}`; 
        axios.get(api, {headers})
        .then(
            (response) => {
                response = response.data;
                response.forEach(
                    (prod) => {
                        let p_id = idGenerator();
                        prod['p_id'] = p_id;
                        response_tr.push(prod);
                    }
                )
                if(response_tr.length == companies.length*nProduct) {
                    if(sort['price']) response_tr.sort(function(a, b){
                        return a.price - b.price;
                    });
                    console.log(response_tr);
                    res.send(response_tr);
                }
            }
        )
    }
    return response_tr;
}

async function getData(catagory, minPrice, maxPrice, nProduct, sort){
    const b_token = await getBearerToken();
    const headers = { 'Authorization': `Bearer ${b_token}` }; 

    let response_tr = [];

    for(var i=0; i<companies.length; i++){
        const api = `http://20.244.56.144/test/companies/${companies[i]}/categories/${catagory}/products?top=${nProduct}&minPrice=${minPrice}&maxPrice=${maxPrice}`; 
        axios.get(api, {headers})
        .then(
            (response) => {
                response = response.data;
                response.forEach(
                    (prod) => {
                        let p_id = idGenerator();
                        prod['p_id'] = p_id;
                        response_tr.push(prod);
                    }
                )
                if(response_tr.length == companies.length*nProduct) {
                    if(sort['price']) response_tr.sort(function(a, b){
                        return a.price - b.price;
                    });
                    if(sort['rating']) response_tr.sort(function(a, b){
                        return a.rating - b.rating;
                    });
                    if(sort['rating']) response_tr.sort(function(a, b){
                        return a.rating - b.rating;
                    });
                    console.log(response_tr);
                }
            }
        )
    }
    return response_tr;
}

module.exports = {
    getDataApi,
}