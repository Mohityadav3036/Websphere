import mongoose, { mongo } from "mongoose"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ServiceProviderSchema = new mongoose.Schema({
   name : {
        type: String,
        require: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required: [true, "Password is required"],
        minlength: [8, "Please use a minimum of 8 characters"],
    },
    refreshToken : {
        type : String
    },
    role : {
        type: String,
        enum : ['user', 'service-provider', 'admin'],
        default : 'service-provider'  ,
    },
    phone : {
        type : Number,
        required : true,
    }, 

    services : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Service'
        }
    ],
    address : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "Address",
    },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
},{
    timestamps:true
}) 

// before saving the password in db we have hash the password

ServiceProviderSchema.pre('save', async function (next) {
        // used for when only password field will change or modifield so this function will call
    if (!this.isModified('password')) return next();     
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

//   To check that username input password will correct or not
  ServiceProviderSchema.method.isPasswordCorrect = async function (password) {
    return await  bcrypt.compare(password, this.password)
  }

//   generate the multiple token
ServiceProviderSchema.methods.generateAccessToken = function(){
 return  jwt.sign(
    {
        _id: this._id,
        email: this.email,
        name: this.name,
        role:this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

  )
}
ServiceProviderSchema.methods.generateRefreshToken = function() {
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


  export const ServiceProvider = mongoose.model('ServiceProvider',ServiceProviderSchema);