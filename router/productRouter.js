const express = require('express');
const router =  express.Router();
const {body , validationResult} =  require('express-validator');
const authenticate = require('../middlewares/authenticate');
const Product  = require('../models/Product');


/*
    @usage : Upload a Product
    @url : /api/products/upload
    @fields : name , brand , price , qty , image , category , description , usage
    @method : POST
    @access : PRIVATE
 */
    
router.post('/upload' ,authenticate ,[
  body('name').notEmpty().withMessage('Name is Required'),
  body('brand').notEmpty().withMessage('Brand is Required'),
  body('price').notEmpty().withMessage('Price is Required'),
  body('qty').notEmpty().withMessage('Qty is Required'),
  body('image').notEmpty().withMessage('Image is Required'),
  body('category').notEmpty().withMessage('Category is Required'),
  body('description').notEmpty().withMessage('Description is Required'),
  body('usage').notEmpty().withMessage('Usage is Required')

],async(request , response)=>{
  let errors =  validationResult(request);
  if(!errors.isEmpty()){
    return response.status(401).json({errors : errors.array()});
  }

  try{

    //get form data
    let {name , brand , price , qty , image , category , description , usage} = request.body;
    let product  = new Product({name , brand , price , qty , image , category , description , usage});
    product = await product.save();
    response.status(200).json({
      msg : 'Product is Uploaded',
      products : product
    });
  }
  catch(error){
    console.log(error);
    response.status(500).json({errors : [{msg : error.message}]});
  }
});


/*
    @usage : Get men a Product
    @url : /api/products/men
    @fields : no fields
    @method : get
    @access : Public
 */
router.get('/men' , async(request , response)=>{
  try{
    let products =  await Product.find({category : 'MEN'});
    response.status(200).json({
      products : products
    });
  }
  catch(error){
    console.log(error);
    response.status(500).json({errors:[{msg : error.message}]});

  }
});


/*
    @usage : Get women a Product
    @url : /api/products/women
    @fields : no fields
    @method : get
    @access : Public
 */

router.get('/women' ,  async( request , response)=>{
  try{
      let products   =  await Product.find({category : "WOMEN"});
      response.status(200).json({
        products : products
      });
  }
  catch(error){
    console.log(error);
    response.status(500).json({errors : [{msg :  error.message}]});
  }
});



/*
    @usage : Get kids  Product
    @url : /api/products/kids
    @fields : no fields
    @method : get
    @access : Public
 */

    router.get('/kids' ,  async( request , response)=>{
      try{
          let products   =  await Product.find({category : "KIDS"});
          response.status(200).json({
            products : products
          });
      }
      catch(error){
        console.log(error);
        response.status(500).json({errors : [{msg :  error.message}]});
      }
    });



/*
@usage : Get a single Product
@url : /api/products/:product_id
@fields : no fields
@method : get
@access : Public
*/

router.get('/:productId', async(request , response)=>{
  let productId  =  request.params.productId;
  try{
    let product = await Product.findById(productId);
    response.status(200).json({
      product : product
    });
  }
  catch(error){
    console.log(error);
    response.status(500).json({errors : [{msg : error.message}]});
  }
});



module.exports = router;