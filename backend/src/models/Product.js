const mongoose = require('mongoose');
const{Schema} = mongoose;
const{Types : {ObjectId}} = Schema;
const productSchema = mongoose.Schema({
writer : {
    type : ObjectId,
    required : true,
    ref: 'User',
},
title : {
    type : String,
    maxLength : 30
},
description : {
    type : String,
},
price : {
    type : Number,
    default : 0
},
images : {
    type : Array,
    default : []
},
sold :{
    type : Number,
    maxLength : 100,
    default : 0
},
continents : {
    type : Number,
},
views : {
    type : Number,
    default : 0
}
}, {timestamps : true})

productSchema.index({
    title : 'text',
    description : 'text'
},{
    weights : {
        title : 5,
        description:1
    },
    type :{
        type : String,
        maxLength : 100
    }
})



module.exports = mongoose.model('Product', productSchema);