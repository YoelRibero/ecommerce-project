import "../scss/app.scss"
import Glide from "@glidejs/glide";
import Products from './components/products'
import Cart from './components/cart'
import swal from "sweetalert";
import Categories from "./components/categories";
import Checkout from "./components/checkout";

// Instanciar clases
const products = new Products();
const cart = new Cart();
const category = new Categories();
const checkout = new Checkout();

// Vars
const mobile = window.matchMedia("screen and (max-width: 425px)");
const ipad = window.matchMedia("screen and (max-width: 767px)");
const notebook = window.matchMedia("screen and (max-width: 1024px)");
const desktop = window.matchMedia("screen and (max-width: 2000px)");

const $cartContainer = document.querySelector(".nav__cart--content");

// Functions

// function slider
function slider() {
  new Glide(".glide").mount();
}

// function carousel
function carousel() {
  let productView;
  if (mobile.matches) {
    productView = 1.25;
  } else if (ipad.matches) {
    productView = 2.5;
  } else if (notebook.matches) {
    productView = 3.5;
  } else if (desktop.matches) {
    productView = 4.5;
  }
  const glideCarousel = new Glide(".glide__carousel", {
    perView: productView,
    gap: 20,
  });
  glideCarousel.mount();
}

// Listeners
document.addEventListener('DOMContentLoaded', async () => {
  const location = window.location.pathname;
  if(location === '/') {
    // Slider
    slider();
    // Carousel new products
    carousel();
    // Render Products
    await products.productsRandom(6, ".home__popular--products");
    // All listeners
    listenersAfterLoadadDOM();
  } else if (location === '/checkout.html' || location === '/order-confirmation.html') {
    checkout.mapCart(productsCart());
  } else {
    category.productCategory()
    // All listeners
    listenersAfterLoadadDOM();
  }
})

// Listener dropdown Cart
function listenersAfterLoadadDOM() {
  const $products = document.querySelectorAll(".product");
  // Listener dropdown
  document.querySelector("[data-cart]").addEventListener("click", (e) => {
    e.preventDefault();
    e.path[2].childNodes[5].classList.toggle("is-active");
  });

  // Header hamburguer
  document.querySelector(".header__hamburguer").addEventListener('click', () => {
    document.querySelector(".header__nav").classList.toggle('is-active');
  })

  // Listener add product cart
  $products.forEach((product) => {
    product.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e);
      if (e.target.tagName === "BUTTON") {
        cart.addProductCart(e.path[1].dataset.id);
      }
    });
  });

  // Listener deleted product from cart
  $cartContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.dataset.deleted === "") {
      swal({
        title: "Delete",
        text: "Are you sure you want to remove the product from the cart?",
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
          }, 1000);
        }
      });
    }
  });
}

// Get products cart

const productsCart = () => {
  const products = localStorage.getItem('cart')
  return JSON.parse(products);
}
