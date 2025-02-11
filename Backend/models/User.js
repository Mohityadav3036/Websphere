import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
        index: true,
    },
    email : {
        type: String,
        require: true,
        unique: true,
    },
    password : {
        type : String,
        require: [true, "Password is required"],
        minlength: [8, "Please use a minimum of 8 characters"],
    },
    refreshToken : {
        type : String
    },
    role : {
        type: String,
        enum : ['user', 'service-provider', 'admin'],
        default : 'user'  ,
    },
    phone : {
        type : Number,
        require : true,
    },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],

    reviews : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Review'}],
},
{
    timestamps:true
})


// before saving the password in db we have hash the password

     UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



  //   generate the multiple token
  UserSchema.methods.generateAccessToken = function(){
   return  jwt.sign(
      {
          _id: this._id,
          email: this.email,
          name: this.name,
          role:this.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  
    )
  }
  UserSchema.methods.generateRefreshToken = function() {
      return  jwt.sign(
          {
              _id: this._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
              expiresIn: process.env.REFRESH_TOKEN_EXPIRY
          }
      
        )
  }


   export const User = mongoose.model('User', UserSchema);
