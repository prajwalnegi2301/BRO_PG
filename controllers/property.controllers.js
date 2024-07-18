import bcrypt from "bcryptjs";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";
import Property from "../models/property.models.js";
import User from "../models/user.models.js";
import cloudinary from "cloudinary";

// Create Property->
export const createProperty = asyncErrorHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler(" Avatar Required!", 400));
  }
  const { image1Avatar, image2Avatar, image3Avatar, image4Avatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (
    !allowedFormats.includes(image1Avatar.mimetype) ||
    (image2Avatar && !allowedFormats.includes(image2Avatar.mimetype)) ||
    (image3Avatar && !allowedFormats.includes(image3Avatar.mimetype)) ||
    (image4Avatar && !allowedFormats.includes(image4Avatar.mimetype))
  ) {
    return next(new ErrorHandler("File Format Not Supported", 400));
  }

  const {
    location,
    purpose,
    bedrooms,
    parking,
    gym,
    furnish,
    name,
    pgFlat,
    food,
    sharing,
    attachWashroom,
    ac,
    rent,
    geyser,
    fridge,
    indoorGames,
    clothWashingService,
  } = req.body;
  if(!location || !purpose || !bedrooms || !parking || !gym || !furnish){
      return next(new ErrorHandler("Fill the credentials",400));
  }

  const ownerId = req.user._id;

  const cloudinaryResponse = await cloudinary.uploader.upload(
    image1Avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed To Upload Avatar1 To Cloudinary", 500)
    );
  }

  const cloudinaryResponse2 = await cloudinary.uploader.upload(
    image2Avatar.tempFilePath
  );
  if (!cloudinaryResponse2 || cloudinaryResponse2.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse2.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed To Upload  Avatar2 To Cloudinary", 500)
    );
  }

  const cloudinaryResponse3 = await cloudinary.uploader.upload(
    image3Avatar.tempFilePath
  );
  if (!cloudinaryResponse3 || cloudinaryResponse3.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse3.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed To Upload  Avatar3 To Cloudinary", 500)
    );
  }

  const cloudinaryResponse4 = await cloudinary.uploader.upload(
    image4Avatar.tempFilePath
  );
  if (!cloudinaryResponse4 || cloudinaryResponse4.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse4.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed To Upload  Avatar4 To Cloudinary", 500)
    );
  }

  const property = new Property({
    location,
    purpose,
    bedrooms,
    parking,
    gym,
    furnish,
    name,
    pgFlat,
    food,
    sharing,
    attachWashroom,
    ac,
    rent,
    geyser,
    fridge,
    indoorGames,
    clothWashingService,
    image1Avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    image2Avatar: {
      public_id: cloudinaryResponse2.public_id,
      url: cloudinaryResponse2.secure_url,
    },
    image3Avatar: {
      public_id: cloudinaryResponse3.public_id,
      url: cloudinaryResponse3.secure_url,
    },
    image4Avatar: {
      public_id: cloudinaryResponse4.public_id,
      url: cloudinaryResponse4.secure_url,
    },
  });

  property.owner = ownerId;
  await property.save();
  res.status(200).json({ message: "Property listed", success: true, property });
});



// Delete Property->
export const deleteProperty = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const property = await Property.findById(id);
  if (!property) {
    return next(new ErrorHandler("Cannot find the property", 400));
  }
  await property.deleteOne();
  res
    .status(200)
    .json({ message: "Property Deleted", success: true, property });
});



// // Update Property->
// export const updateProperty = asyncErrorHandler(async (req, res, next) => {
//   // const user = req.user;
//   const { id } = req.params;

//   const {
//     location,
//     bedrooms,
//     parking,
//     furnish,
//     gym,
//     purpose,
//     pgFlat,
//     food,
//     sharing,
//     attachWashroom,
//     ac,
//     rent,
//     geyser,
//     fridge,
//     indoorGames,
//     clothWashingService,
//   } = req.body;

//   const findProperty = Property.findById(id);
//   if (!findProperty) {
//     return next(new ErrorHandler("Cannot find Property", 400));
//   }
//   const property = await Property.findByIdAndUpdate(
//     id,
//     {
//       location,
//       purpose,
//       bedrooms,
//       parking,
//       furnish,
//       gym,
//       pgFlat,
//       food,
//       sharing,
//       attachWashroom,
//       ac,
//       rent,
//       geyser,
//       fridge,
//       indoorGames,
//       clothWashingService,
//     },
//     { new: true, runValidators: true, useFindAndModify: false }
//   );

//   res
//     .status(200)
//     .json({ message: "Property Updated", success: true, property });
// });



// getAllProperties
export const getAllProperties = asyncErrorHandler(async (req, res, next) => {
  const properties = await Property.find();
  if (!properties) {
    return next(new ErrorHandler("No Properties Found", 404));
  }
  res
    .status(200)
    .json({ message: "All Properties....", success: true, properties });
});

