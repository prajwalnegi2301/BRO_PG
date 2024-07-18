import mongoose from 'mongoose';

const database = ()=>{
    mongoose.connect(process.env.MONGO,{
        dbName: "REAL_ESTATE_MERN_STACK",
    })
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log(`Some error occured while connecting to databsse: ${err}`);
    });
};

export default database;