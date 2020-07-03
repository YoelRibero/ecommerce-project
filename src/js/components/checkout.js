export default class Checkout {
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
}