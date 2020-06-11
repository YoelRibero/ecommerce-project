import API from "./api";

export default class Products {
  constructor() {
    this.api = new API(); 
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
          <button class="button">Agregar al carrito</div>
        </article>
      `
    ;
  }
  async mapProducts() {
    const data = await this.api.getData('products')
    const products = data.products
    products.forEach(product => {
      const { id, name } = product
      const HTML = this.templateProduct(id, name)
      const templateHTML = this.createTemplate(HTML)
      document.querySelector("#app").append(templateHTML);
    })
  }
}