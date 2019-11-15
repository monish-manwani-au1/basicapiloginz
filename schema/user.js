
var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        
    }
    
});

var User = mongoose.model('user', userSchema);

module.exports = {User}