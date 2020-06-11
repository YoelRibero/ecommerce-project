import "../scss/app.scss"
import Products from './components/products'
import Cart from './components/cart'

document.addEventListener('DOMContentLoaded', async () => {
  // Instanciar clases
  const products = new Products();
  const cart = new Cart();

  // Render Products
  await products.mapProducts()
  const $products = document.querySelectorAll('.product')
  $products.forEach(product => {
    product.addEventListener('click', (e) => {
      e.preventDefault()
      if (e.target.tagName === 'BUTTON') {
        cart.addProductCart(e.path[1].dataset.id);
      }
    })
  })
  
  //
  const $cartContainer = document.querySelector('#cart');
  // Listener deleted product from cart
  $cartContainer.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.dataset.deleted === '') {
      cart.deletedProduct(e.path[1].dataset.id);
    }
  })
})

