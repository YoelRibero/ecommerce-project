import API from "./api";
import images from "../../images/products/technology-2.jpg";

export default class Products {
  constructor() {
    this.api = new API()
  }
  createTemplate(HTMLString) {
		const html = document.implementation.createHTMLDocument()
		html.body.innerHTML = HTMLString
		return html.body.children[0]
	}
  templateProduct(id, image, title, bedroom, brand, category) {
    return `
        <article class="product" data-id="${id}">
          <div class="product__image">
            <img src="src/images/products/${images}" alt="product-${id}" />
          </div>
          <div class="product__description">
            <div class="product__title">${title}</div>
            <div class="aditional__info">
              <span class="product__bedroom">${bedroom}</span>
              <span class="product__brand">${brand}</span>
              <span class="product__category">${category}</span>
            </div>
          </div>
          <button class="button">Agregar al carrito</div>
        </article>
      `;
  }
  async mapProducts() {
    const data = await this.api.getData('products')
    const products = data.products
    products.forEach(product => {
      let { id, image, name, bedroom, brand, category } = product
      if (bedroom === undefined) {
        bedroom = ''
      } else if (brand === undefined) {
        brand = ''
      }
      const HTML = this.templateProduct(id, image, name, bedroom, brand, category)
      const templateHTML = this.createTemplate(HTML)
      document.querySelector(".catalogue").append(templateHTML);
    })
  }
}