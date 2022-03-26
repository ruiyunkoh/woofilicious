const express = require("express");
const router = express.Router();

// import in the Forms
const { bootstrapField, createProductForm } = require('../forms');

const {Product} = require('../models')

router.get('/', async (req,res)=>{    
    let products = await Product.collection().fetch();
    res.render('products/index', {
        'products': products.toJSON() 
    })
});

router.get('/create', async (req, res) => {
    const productForm = createProductForm();
    res.render('products/create',{
        'form': productForm.toHTML(bootstrapField)
    })
});

router.post('/create', async(req,res)=>{
    const productForm = createProductForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Product();
            product.set('name', form.data.name);
            product.set('cost', form.data.cost);
            product.set('image', form.data.image);
            product.set('description', form.data.description);
            product.set('ingredient', form.data.ingredient);
            await product.save();
            res.redirect('/products');
        },
        'error': async (form) => {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField)
            })
        },
    })
})

module.exports = router;
