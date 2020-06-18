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
        cart.addProductCart(e.path[1].dataset.id);
        
        // setTimeout(() => {
          
        // }, 1000)
      }
    })
  })
  
  //
  const $cartContainer = document.querySelector(".nav__cart--content");
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
            cart.deletedProduct(e.path[2].dataset.id);
          }, 1000)
        } 
      });
    }
  })

  // Header hamburguer
  document.querySelector(".header__hamburguer").addEventListener('click', () => {
    document.querySelector(".header__nav").classList.toggle('is-active');
  })

  // dropdown Cart
  document.querySelector("[data-cart]").addEventListener('click', (e) => {
    e.preventDefault()
    e.path[2].childNodes[5].classList.toggle('is-active');
    // document.querySelector(".nav__cart").classList.toggle('is-active')
  })
})

