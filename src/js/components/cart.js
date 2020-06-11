import API from './api'

export default class Cart {
  constructor() {
    const cacheCart = window.localStorage.getItem("cart");
    if (cacheCart) {
      this.cart = JSON.parse(cacheCart)
      this.printCart(this.cart)
    } else {
      this.cart = [];
    }
    this.api = new API()
  }
  createTemplate(HTMLString) {
		const html = document.implementation.createHTMLDocument()
		html.body.innerHTML = HTMLString
		return html.body.children[0]
	}
  templateProduct(id, title) {
    return `
        <article class="product" data-id="${id}">
          <div class="product__title">${title}</div>
          <button class="button" data-deleted>Eliminar del carrito</div>
        </article>
      `
    ;
  }
  async addProductCart(id) {
    const data = await this.api.getData('products')
    // const productCart = data.products.filter(product => product.id === parseInt(id))
    data.products.forEach(product => {
      if (product.id === parseInt(id)) {
        const productCart = {
          id: product.id,
          name: product.name,
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
    console.log(cart)
    document.querySelector("#cart").innerHTML = '';
    cart.forEach(product => {
      const { id, name} = product
      const HTML = this.templateProduct(id, name)
      const templateHTML = this.createTemplate(HTML)
      document.querySelector("#cart").append(templateHTML)
    })
  }
} 