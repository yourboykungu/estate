import mongoose from "mongoose";

const listingScheme= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedroom: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        offer: {
            type:Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        useRef: {
            type: String,
            required: true,
        },
},{ timestamps: true}
)

const Listing= new mongoose.model('listing',listingScheme);

export default Listing;