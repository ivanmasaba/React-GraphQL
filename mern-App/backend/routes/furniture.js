const express = require('express');
const furnitureController = require('../controllers/furniture')
const router = express.Router();

//get all furniture
router.get('/', furnitureController.allFurniture );

//get single furniture
router.get('/:id', furnitureController.oneFurniture );

//create furniture
router.post('/', furnitureController.createFurniture );

//delete furniture
router.delete('/:id', furnitureController.deleteFurniture );

//update furniture
router.put('/:id', furnitureController.updateFurniture );

module.exports = router