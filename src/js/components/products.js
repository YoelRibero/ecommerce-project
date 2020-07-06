import API from "./api";

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
  templateProductModal(name, id, image, price, category, bedroom, brand) {
    return `
      <div class="modal__product" data-id="${id}">
        <figure class="modal__product--image">
          <img src="https://yoelribero.github.io/ecommerce-project/src/images/products/${image}" alt="product-${id}" />
        </figure>
        <section class="modal__product--info">
          <h2 class="modal__product--name">${name}</h2>
          <div class="modal__product--price"><span>USD</span> ${price}</div>
          <div class="aditional__info">
            <span class="product__bedroom">${bedroom}</span>
            <span class="product__brand">${brand}</span>
            <span class="product__category">${category}</span>
          </div>
          <button class="button">Agregar al carrito</div>
        </section>
      </div>
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
  newProducts() {
    const products = document.querySelectorAll(".home__new--products .glide__slides .product")
    products.forEach(product => {
      const li = document.createElement("li");
      li.classList.add("glide__slide");
      document.querySelector(".home__new--products .glide__slides").appendChild(li)
      li.appendChild(product)
    })
  }
  async productsRandom(quantity, container) {
    const products = await this.getProducts();
    let productsRandom = []
    for (let i = 0; i < quantity; i++) {
      const randomNumber = Math.floor(Math.random() * (18 - 1)) + 1;
      productsRandom.push(products[randomNumber])
    }
    const productsWithoutRepeated = productsRandom.filter((product, index) => productsRandom.indexOf(product) === index)
    this.mapProducts(productsWithoutRepeated, container);
  }
  async getProduct(id) {
    const products = await this.getProducts();
    const dataProduct = products.filter(product => product.id === parseInt(id));
    const product = dataProduct[0]
    console.log(product)
    let { name, idProduct, image, price, category, bedroom, brand } = product
    if (bedroom === undefined) {
      bedroom = "";
    } else if (brand === undefined) {
      brand = "";
    }
    return this.templateProductModal(name, idProduct, image, price, category, bedroom, brand)
  }
}