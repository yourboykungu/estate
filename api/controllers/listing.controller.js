import Listing from "../models/listing.model.js"

export const createListening= async(req, res, next) =>{
    
    try {
        const listing= await Listing.create(req.body);
       // console.log(listing); 
        return res.status(201).json(listing);     
    } catch (error) {
        next(error);
    }
}