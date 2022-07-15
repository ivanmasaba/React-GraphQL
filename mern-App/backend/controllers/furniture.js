const Furniture = require('../models/furniture');
// const {ImageBasePath} = require('../models/furniture');
const mongoose = require('mongoose');
const sharp = require('sharp');
const fs = require('fs');

/*************************** */
//get all furniture
module.exports.allFurniture = async (req, res) => {
   try{ 
    const furniture = await Furniture.find({}).sort({createdAt: -1});
    res.status(200).json(furniture);
   }catch(error){
    res.status(400).json({error: error.mesage});
   }

}

/*************************** */

//get one Furniture
module.exports.oneFurniture = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({error: "No such Furniture..."})
    }
     const furniture = await Furniture.find({categoryID: id});
        
    if (!furniture){
     return res.status(400).json({error: "No such Furniture..."});
    }

    res.status(200).json(furniture);
 
 }

/************************** */

//Create Furniture
module.exports.createFurniture = async (req, res) => {
    const { name, category, description } = req.body;
    let emptyFields = [];

    if(!name){
        emptyFields.push('name');
    }
    if(!category){
        emptyFields.push('category');
    }
    if(!description){
        emptyFields.push('description');
    }

    if (!req.files) {
        emptyFields.push('file');
      }

      if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
      }

    const file = req.files.file;
    const imageName = file.name;
    // console.log(req.files.file)
    // add Furniture to db
    try{ 
     const furniture = await Furniture.create({ name, categoryID: category, description, imageName });

     const path = 'public/uploads/' + imageName;
     const after = 'public/images/' + imageName;
     file.mv(after, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });

     sharp(after).resize(200,200)
    .jpeg({quality : 50})
    .toFile(path)
    //   // delete file after resize
    // fs.unlink(after, function (err) {
    //     if (err) throw err;
    //     // if no error, file has been deleted successfully
    //     console.log('File deleted!');
    // });
   
     

     res.status(200).json(furniture);
    }catch(error){
     res.status(400).json({error: error.mesage});
    }
 
 }

 /*************************** */

//delete Furniture
module.exports.deleteFurniture = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({error: "No such Furniture..."})
    }
     const furniture = await Furniture.findOneAndDelete({_id: id});
        
    if (!furniture){
     return res.status(400).json({error: "No such Furniture..."});
    }

    res.status(200).json(furniture);
 
 }

 /*************************** */

//update Furniture
module.exports.updateFurniture = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({error: "No such Furniture..."})
    }
     const furniture = await Furniture.findOneAndUpdate({_id: id}, { ...req.body });
        
    if (!furniture){
     return res.status(400).json({error: "No such Furniture..."});
    }

    res.status(200).json(furniture);
 
 }