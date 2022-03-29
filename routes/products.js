const express = require("express");
const router = express.Router();

// import in the Forms
const {
  bootstrapField,
  createProductForm
} = require('../forms');

const {
  Product,
  Type,
  Size
} = require('../models')

router.get('/', async function (req, res) {
  let products = await Product.collection().fetch({
    withRelated: ['type', 'sizes'],
  });
  // console.log(products.toJSON());
  res.render('products/index', {
    'products': products.toJSON()
  })
});


//Create product

router.get('/create', async function (req, res) {
  const allTypes = await Type.fetchAll().map((type) => {
    return [type.get('id'), type.get('name')];
  });

  const allSizes = await Size.fetchAll().map(size => [size.get('id'), size.get('name')]);

  const productForm = createProductForm(allTypes, allSizes);
  res.render('products/create', {
    'form': productForm.toHTML(bootstrapField)
  })
});

router.post('/create', async function (req, res) {
  const allTypes = await Type.fetchAll().map((type) => {
    return [type.get('id'), type.get('name')];
  });

  const allSizes = await Size.fetchAll().map(size => [size.get('id'), size.get('name')]);

  const productForm = createProductForm(allTypes, allSizes);
  productForm.handle(req, {
    'success': async function (form) {
      const product = new Product();
      product.set('name', form.data.name);
      product.set('cost', form.data.cost);
      product.set('image', form.data.image);
      product.set('description', form.data.description);
      product.set('ingredient', form.data.ingredient);
      product.set('source', form.data.source);
      product.set('type_id', form.data.type_id);
      await product.save();

      if (form.data.sizes) {
        let selectedSizes = form.data.sizes.split(',');
        await product.sizes().attach(selectedSizes);
      }
      req.flash("success_messages", `New Product ${product.get('name')} has been created`)

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
    require: true,
    withRelated: ['type', 'sizes'],
  });
  const allTypes = await Type.fetchAll().map((type) => {
    return [type.get('id'), type.get('name')];
  });
  const allSizes = await Size.fetchAll().map(size => [size.get('id'), size.get('name')]);

  const productForm = createProductForm(allTypes, allSizes);

  // fill in the existing values
  productForm.fields.name.value = product.get('name');
  productForm.fields.cost.value = product.get('cost');
  productForm.fields.image.value = product.get('image');
  productForm.fields.description.value = product.get('description');
  productForm.fields.ingredient.value = product.get('ingredient');
  productForm.fields.source.value = product.get('source');
  productForm.fields.type_id.value = product.get('type_id');

  let selectedSizes = await product.related('sizes').pluck('id');
  productForm.fields.sizes.value = selectedSizes;

  res.render('products/update', {
    'form': productForm.toHTML(bootstrapField),
    'product': product.toJSON()
  })
})

router.post('/:product_id/update', async (req, res) => {
  const allTypes = await Type.fetchAll().map((type) => {
    return [type.get('id'), type.get('name')];
  });

  const allSizes = await Size.fetchAll().map(size => [size.get('id'), size.get('name')]);

  const product = await Product.where({
    'id': req.params.product_id
  }).fetch({
    require: true,
    withRelated: ['sizes']
  });

  const productForm = createProductForm(allTypes, allSizes);

  productForm.handle(req, {
    'success': async (form) => {
      let {
        sizes,
        ...productData
      } = form.data;
      product.set(productData);
      await product.save();

      let sizeIds = sizes.split(',');
      let existingSizeIds = await product.related('sizes').pluck('id');
      let toRemove = existingSizeIds.filter(id => sizeIds.includes(id) === false);
      await product.sizes().detach(toRemove);
      await product.sizes().attach(sizeIds);

      req.flash("success_messages", `Product ${product.get('name')} has been updated`)

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

  req.flash("success_messages", `Product has been deleted`)

  res.redirect('/products')
})

//Product details

router.get('/:product_id/details', async (req, res) => {

  const product = await Product.where({
    'id': req.params.product_id
  }).fetch({
    require: true,
    withRelated: ['type', 'sizes'],
  });

  // console.log(product.toJSON());

  res.render('products/details', {
    'product': product.toJSON()
  })

});

module.exports = router;