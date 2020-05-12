var jsf = require("json-schema-faker");
var getEnergyBillSchema = require("../src/api/mockEnergyBillSchema.js");
//var getEnergyBillSchema = require("./mockEnergyBillSchema.js");
var fs = require("fs");
var chalk = require("chalk");

const json = JSON.stringify(jsf(getEnergyBillSchema));

fs.writeFile("./src/api/db.json",json,function (err){
    if(err){
        return console.log(chalk.red(err));
    }else{
        return console.log(chalk.green("Mock data generated"));
    }
});


