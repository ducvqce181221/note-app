const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    createOn: { type: Date, default: Date.now() }
});

const User = mongoose.model('User', userSchema);
// const user1 = new user({
//     fullName: 'Quang Duck'
// });

// user1.save();


module.exports = User 