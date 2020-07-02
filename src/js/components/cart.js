import API from './api'
import imageDelete from '../../images/delete.svg'
import imageProduct from '../../images/products/technology-2.jpg'

export default class Cart {
  constructor() {
    const cacheCart = window.localStorage.getItem("cart");
    if (cacheCart) {
      this.cart = JSON.parse(cacheCart)
      this.printCart(this.cart)
    } else {
      this.cart = [];
      this.printCart(this.cart);
    }
    this.api = new API()
  }
  createTemplate(HTMLString) {
		const html = document.implementation.createHTMLDocument()
		html.body.innerHTML = HTMLString
		return html.body.children[0]
	}
  templateProduct(id, title, price) {
    return `
        <article class="product__cart" data-id="${id}">
          <div class="product__cart--info">
            <figure class="product__cart--image">
              <img src="${imageProduct}" />
            </figure>
            <section class="product__cart--description">
              <div class="product__cart--title">${title}</div>
              <div class="product__cart--price">${price}</div>
            </section>
          </div>
          <button class="button button--danger"><img src="${imageDelete}" data-deleted /></div>
        </article>
      `;
  }
  async addProductCart(id) {
    if (this.cart.find(product => product.id === parseInt(id))) {
      swal("Oh Oh!", "The product already exist in the cart...", "error");
      return false
    }
    swal("Perfect!", "You have added a product to the cart", "success");
    const data = await this.api.getData("products");
    data.products.forEach(product => {
      if (product.id === parseInt(id)) {
        const productCart = {
          id: product.id,
          name: product.name,
          price: product.price
        };
        this.cart.push(productCart);
        window.localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    })
    this.printCart(this.cart)
  }
  deletedProduct(id) {
    this.cart = this.cart.filter(element => element.id !== parseInt(id));
    window.localStorage.setItem("cart", JSON.stringify(this.cart));
    this.printCart(this.cart);
  }
  printCart(cart) {
    const $cartContainer = document.querySelector(".nav__cart--content");
    if($cartContainer) {
      if (cart.length === 0) {
        document.querySelector(
          ".nav__cart--content"
        ).innerHTML = `<p>Your cart is empty</p>`;
      } else {
        $cartContainer.innerHTML = "";
      }
      document.querySelector(".pill-count").textContent = cart.length;
      cart.forEach((product) => {
        const { id, name, price } = product;
        const HTML = this.templateProduct(id, name, price);
        const templateHTML = this.createTemplate(HTML);
        $cartContainer.append(templateHTML);
      });
      if (cart.length !== 0) {
        $cartContainer.innerHTML += `<div class="cart__action"><a href="./checkout.html">To Buy</a></div>`;
      }
    }
  }
} 