const mongoose = require('mongoose');
import bcrypt from 'bcrypt';

const AdminSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true ,
    unique : true
  }, 
  email: { 
    type: String, 
    required: true, 
    unique: true 
  }, 
  password: { 
    type: String, 
    required: true 
  },
  refreshToken : {
      type : String
  }, 
  role: { 
    type: String, 
    enum : ['user', 'service-provider', 'admin'],
    default: 'admin' 
  }, 
  contactNumber: { 
    type: String 
  }, 
  createdAt: { 
    type: Date, 
    default: Date.now 
  }, 
  loginKey: { 
    type: String, 
    required: true, 
    unique: true 
  },
  users: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }], 
  serviceProviders: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ServiceProvider' 
  }], 
});

// Pre-save hook to hash password before saving the admin
AdminSchema.pre('save', async function(next) {
 
  if (this.isModified('password')) {
    // Generate salt for hashing password
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

//   generate the multiple token
AdminSchema.methods.generateAccessToken = function(){
 return  jwt.sign(
    {
        _id: this._id,
        email: this.email,
        name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

  )
}
AdminSchema.methods.generateRefreshToken = function() {
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


export const Admin = mongoose.model('Admin', AdminSchema);
