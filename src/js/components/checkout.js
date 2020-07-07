export default class Checkout {
  constructor() {
    this.formCheckout = document.getElementById("form-checkout");
    this.checkoutEmail = document.getElementById("checkout-email");
    this.checkoutName = document.getElementById("checkout-name");
    this.checkoutAddress = document.getElementById("checkout-address");
    this.checkoutDeliveryAddress = document.getElementById("checkout-delivery-address");
  }
  cacheExist() {
    const data = window.localStorage.getItem("user");
    return JSON.parse(data)
  }
  changeForm() {
    const cacheExist = this.cacheExist()
    if (cacheExist) {
      const { name, email } = cacheExist;
      this.checkoutEmail.value = email
      this.checkoutName.value = name
    }
  }
  createTemplate(HTMLString) {
		const html = document.implementation.createHTMLDocument()
		html.body.innerHTML = HTMLString
		return html.body.children[0]
  }
  templateProduct(name, price) {
    return `
        <div class="checkout__product">
          <div class="checkout__product--name">${name}</div>
          <div class="checkout__product--price">USD ${price}</div>
        </div>
      `;
  }
  mapCart(cart) {
    console.log(cart)
    const $cartContainer = document.querySelector(".checkout__products");
    document.querySelector(".checkout__length").textContent = `${cart.length} Producto/s`;
    let total = 0;
    cart.forEach(product => {
      const { name, price } = product;
      const HTML = this.templateProduct(name, price);
      const templateHTML = this.createTemplate(HTML);
      $cartContainer.append(templateHTML);
      total += price
    });
    document.querySelector(".checkout__total--price").textContent = total;
  }
  setForm() {
    const user = {
      name: this.checkoutName.value,
      email: this.checkoutEmail.value,
      address: this.checkoutAddress.value,
      addressDelivery: this.checkoutDeliveryAddress.value
    }
    window.localStorage.setItem("user", JSON.stringify(user));
  }
}