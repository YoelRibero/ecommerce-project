import "../scss/app.scss"
import Products from './components/products'
import Cart from './components/cart'
import swal from "sweetalert";

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
        swal("Good job!", "You have added a product to the cart", "success");
        setTimeout(() => {
          cart.addProductCart(e.path[1].dataset.id);
        }, 1000)
      }
    })
  })
  
  //
  const $cartContainer = document.querySelector('#cart');
  // Listener deleted product from cart
  $cartContainer.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.dataset.deleted === '') {
      swal({
        title: "Dalete",
        text:"Are you sure you want to remove the product from the cart?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("The product was deleted from the cart", {
            icon: "success",
          });
          setTimeout(() => {
            cart.deletedProduct(e.path[1].dataset.id);
          }, 1000)
        } 
      });
    }
  })

  // Header hamburguer
  document.querySelector(".header__hamburguer").addEventListener('click', () => {
    document.querySelector(".header__nav").classList.toggle('is-active');
  })
})

