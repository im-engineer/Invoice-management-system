import mongoose from 'mongoose';
var config = require('./config').get('staging').DB;
console.log(config);

const mongourl = `mongodb://${config.HOST}:${config.PORT}/${config.DBNAME}`;
console.log(mongourl);

const options = {
    user : config.USERNAME,
    pass : config.PASSWORD
}
console.log(options)

export const mongoconnection = async() => {
    try{
        await mongoose.connect(mongourl,options);
        console.log("connection ho gya")
    }catch(e){
        console.log(e);
        throw e;
    }
}
