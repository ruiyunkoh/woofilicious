const express = require("express");
const router = express.Router();

// import in the Forms
const {
  bootstrapField,
  createProductForm
} = require('../forms');

const {
  Product,
  Type
} = require('../models')

router.get('/', async function (req, res) {
  let products = await Product.collection().fetch({
    withRelated: ['type']
  });
  res.render('products/index', {
    'products': products.toJSON()
  })
});

//Create product

router.get('/create', async function (req, res) {
  const allTypes = await Type.fetchAll().map((type) => {
    return [type.get('id'), type.get('name')];
  });

  const productForm = createProductForm(allTypes);
  res.render('products/create', {
    'form': productForm.toHTML(bootstrapField)
  })
});

router.post('/create', async function (req, res) {
  const allTypes = await Type.fetchAll().map((type) => {
    return [type.get('id'), type.get('name')];
  });

  const productForm = createProductForm(allTypes);
  productForm.handle(req, {
    'success': async function (form) {
      const product = new Product();
      product.set('name', form.data.name);
      product.set('cost', form.data.cost);
      product.set('image', form.data.image);
      product.set('description', form.data.description);
      product.set('ingredient', form.data.ingredient);
      await product.save();
      res.redirect('/products');
    },
    'error': async function (form) {
      res.render('products/create', {
        'form': form.toHTML(bootstrapField)
      })
    },
  })
})

//Update product

router.get('/:product_id/update', async (req, res) => {
  // retrieve the product
  const productId = req.params.product_id
  const product = await Product.where({
    'id': productId
  }).fetch({
    require: true
  });
  const allTypes = await Type.fetchAll().map((type) => {
    return [type.get('id'), type.get('name')];
  })

  const productForm = createProductForm(allTypes);

  // fill in the existing values
  productForm.fields.name.value = product.get('name');
  productForm.fields.cost.value = product.get('cost');
  productForm.fields.description.value = product.get('description');
  productForm.fields.cost.value = product.get('ingredient');
  productForm.fields.category_id.value = product.get('type_id');

  res.render('products/update', {
    'form': productForm.toHTML(bootstrapField),
    'product': product.toJSON()
  })
})

router.post('/:product_id/update', async (req, res) => {
  const allTypes = await Type.fetchAll().map((type) => {
    return [type.get('id'), type.get('name')];
  })

  const product = await Product.where({
    'id': req.params.product_id
  }).fetch({
    require: true
  });

  const productForm = createProductForm(allTypes);
  productForm.handle(req, {
    'success': async (form) => {
      product.set(form.data);
      product.save();
      res.redirect('/products');
    },
    'error': async (form) => {
      res.render('products/update', {
        'form': form.toHTML(bootstrapField),
        'product': product.toJSON()
      })
    }
  })
})

// Delete product

router.get('/:product_id/delete', async (req, res) => {

  const product = await Product.where({
    'id': req.params.product_id
  }).fetch({
    require: true
  });

  res.render('products/delete', {
    'product': product.toJSON()
  })

});

router.post('/:product_id/delete', async (req, res) => {
  // fetch the product that we want to delete
  const product = await Product.where({
    'id': req.params.product_id
  }).fetch({
    require: true
  });
  await product.destroy();
  res.redirect('/products')
})

module.exports = router;