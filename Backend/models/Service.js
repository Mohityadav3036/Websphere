import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { Review } from "./Review.js";
const ServiceSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    images : [ {
        type : String,
    } ] ,
    videos :[ {
        type : String,
    } ] ,
    city : {
        type : String,
        
    },
    reviews : [
        { 
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review',
        }
    ],
    averageRating: {
        type : Number,
        default  : 0,
    },
    ServiceProvider:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ServiceProvider',
    }

},{timestamps: true})

// To calculate the average rating of the reviews 
 

ServiceSchema.methods.calculateAverageRating = async function () {
    if (this.reviews.length === 0) return 0;
  
    const reviews = await Review.find({ _id: { $in: this.reviews } });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  export const Service = mongoose.model('Service', ServiceSchema);