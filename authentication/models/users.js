const mongose = require("mongoose");

const Schema = mongose.Schema;

const userSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    username: {type: String, unique: true},
    password: {type:String,required:true}
});

module.exports = mongose.model("User",userSchema);