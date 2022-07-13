const Category = require('../models/Category');
const mongoose = require('mongoose')

/*************************** */
//get all categories
module.exports.allCategories = async (req, res) => {
   try{ 
    const categories = await Category.find({}).sort({createdAt: -1});
    res.status(200).json(categories);
   }catch(error){
    res.status(400).json({error: error.mesage});
   }

}

/*************************** */

//get one category
module.exports.oneCategory = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({error: "No such category..."})
    }
     const category = await Category.findById(id);
        
    if (!category){
     return res.status(400).json({error: "No such category..."});
    }

    res.status(200).json(category);
 
 }

/************************** */

//Create a category
module.exports.createCategory = async (req, res) => {
    const { name } = req.body;

    // add category to db
    try{ 
     const category = await Category.create({ name });
     res.status(200).json(category);
    }catch(error){
     res.status(400).json({error: error.mesage});
    }
 
 }

 /*************************** */

//delete a category
module.exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({error: "No such category..."})
    }
     const category = await Category.findOneAndDelete({_id: id});
        
    if (!category){
     return res.status(400).json({error: "No such category..."});
    }

    res.status(200).json(category);
 
 }

 /*************************** */

//update a category
module.exports.updateCategory = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({error: "No such category..."})
    }
     const category = await Category.findOneAndUpdate({_id: id}, { ...req.body });
        
    if (!category){
     return res.status(400).json({error: "No such category..."});
    }

    res.status(200).json(category);
 
 }