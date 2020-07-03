import API from "./api";
import images from "../../images/1.jpg";

export default class Products {
  constructor() {
    this.api = new API()
  }
  async getProducts() {
    const data = await this.api.getData("products");
    const products = data.products;
    return products
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
            <img src="https://yoelribero.github.io/ecommerce-project/src/images/products/${image}" alt="product-${id}" />
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
  mapProducts(products, container) {
    products.forEach(product => {
      let { id, image, name, bedroom, brand, category } = product
      if (bedroom === undefined) {
        bedroom = ''
      } else if (brand === undefined) {
        brand = ''
      }
      const HTML = this.templateProduct(id, image, name, bedroom, brand, category)
      const templateHTML = this.createTemplate(HTML)
      document.querySelector(container).append(templateHTML);
    })
  }
  async productsRandom(quanty, container) {
    const products = await this.getProducts();
    let productsRandom = []
    for (let i = 0; i < quanty; i++) {
      const randomNumber = Math.floor(Math.random() * (18 - 1)) + 1;
      productsRandom.push(products[randomNumber])
    }
    const productsWithoutRepeated = productsRandom.filter((product, index) => productsRandom.indexOf(product) === index)
    this.mapProducts(productsWithoutRepeated, container);
  }
}