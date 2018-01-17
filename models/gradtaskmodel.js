// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//cerate a comment schema
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


// create a gradtask schema
var gradtaskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Gradtasks = mongoose.model('Gradtask', gradtaskSchema);

// make this available to our Node applications
module.exports = Gradtasks;