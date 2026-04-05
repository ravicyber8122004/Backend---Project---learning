// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET,
// })

// export const uploadToCloudinary = async(localFilePath) => {
//     try{
//         if(!localFilePath) return null
//         // upload the file on cloudinary
//       const response = await  cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//         // file has been uploaded successfull
//         // console.log("file is uploaded on cloudinary",response.url);
       
//        fs.unlinkSync(localFilePath) 
//         return response
//     }catch(error){
//               fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//               return null;
//     }
// }



// // cloudinary.uploader.upload(
// //   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Olympic_flag.svg/1200px-Olympic_flag.svg.png",
// //   { public_id: "olympic_flag" },
// //   function (error, result) {
// //     console.log(result);
// //     console.log(error);
// //   }
// // );


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // ✅ delete only if exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;

    } catch (error) {

        // ✅ safe delete in error case
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        console.error("Cloudinary upload error:", error);

        return null;
    }
};