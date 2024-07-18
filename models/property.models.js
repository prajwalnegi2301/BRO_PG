import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({

    location:{
        type:String,
    },
    purpose:{
        type:String,
        enum:["Rent","Buy"],
    },
    name:{
        type:String,
    },
    bedrooms:{
        type:String,
      
    },
    parking:{
        type:String,
        enum:["Available","NotAvailable"],
    },
    gym:{
        type:String,
        enum:["Available","NotAvailable"],
    },    
    pgFlat:{
        type:String,
        enum:["Pg","Flat"],
    },
    food:{
        type:String,
        enum:["WithFood","WithoutFood"],
    },
    sharing:{
        type:String,
        enum:["SingleSharing","DoubleSharing","TripleSharing"],
    },
    attachWashroom:{
        type:String,
        enum:["Available","NotAvailable"],
    },
    ac:{
        type:String,
        enum:["Available","NotAvailable"],
    },
    rent:{
        type:String,
        enum:["10000","10500","18000"],
    },
    geyser:{
        type:String,
        enum:["Available","NotAvailable"],
    },
    fridge:{
        type:String,
        enum:["Available","NotAvailable"],
    },
    indoorGames:{
        type:String,
        enum:["BilliardPool","Carrom","Chess"],
    },
    clothWashingService:{
        type:String,
        enum:["Available","NotAvailable"],
    },
    furnish:{
        type:String,
        enum:["Furnished","SemiFurnished","UnFurnished"],
    },
    image1Avatar:{
        public_id:String,
        url:String,
    },
    image2Avatar:{
        public_id:String,
        url:String,
    },
    image3Avatar:{
        public_id:String,
        url:String,
    },
    image4Avatar:{
        public_id:String,
        url:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
{timestamps:true});

const property = mongoose.model("Property", propertySchema);
export default property;