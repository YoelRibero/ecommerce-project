import API from "./api";
import Products from './products'

export default class Categories {
  constructor() {
    this.products = new Products();
    this.api = new API();
  }
  async getProducts() {
    const data = await this.api.getData("products");
    const products = data.products;
    return products;
  }
  async productCategory() {
    const products = await this.getProducts()
    const category = document.title.toLowerCase()
    const productsCategory = products.filter(product => product.category === category)
    this.products.mapProducts(productsCategory, ".category__page--content");
  }
}