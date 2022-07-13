const express = require('express');
const categoryController = require('../controllers/category')
const router = express.Router();

//get all categories
router.get('/', categoryController.allCategories );

//get single category
router.get('/:id', categoryController.oneCategory );

//create a category
router.post('/', categoryController.createCategory );

//delete a category
router.delete('/:id', categoryController.deleteCategory );

//update a category
router.put('/:id', categoryController.updateCategory );

module.exports = router