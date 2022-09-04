const {Schema, model}= require('mongoose');
const validateEmail = require('../utils/validateEmail');

const UserSchema = new Schema ({
    username: {
        type:String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        validate:[validateEmail, "Please enter valid email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
          ],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
const User = model('User', UserSchema);

module.exports = User;

