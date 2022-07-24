// make connect the database mongodb

const mongoose = require('mongoose')

// ,{useCreateIndex : true,useNewUrlParser:true,useUnifiedToplogy:true}
mongoose.connect('mongodb://localhost:27017/RestApi')
        .then(()=>{
            console.log('database connect...')
        })
        .catch(()=>{
            console.log('Not connect any error occur')
        });


// module.exports =