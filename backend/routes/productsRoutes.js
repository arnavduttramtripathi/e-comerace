
import express from 'express';

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

//Router to create a new product 
router.post('/add', createProduct);
// Router to get all products
router.get('/', getProducts);
// Router to update a product by id 
router.put('/update/:id', updateProduct);

router.delete('/delete/:id', deleteProduct);

export default router; 


// {
//   "title":"Macbook Air M3",
//   "price":85000,
//   "description":"Apple M3 chip laptop",
//   "category":"Leptop",
//   "image":"http://example.com/mac.jpg",
//   "stock":10
// }