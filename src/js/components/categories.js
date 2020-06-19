import API from "./api";

export default class Categories {
  constructor() {
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
    console.log(category)
    const productsCategory = products.filter(product => product.category === category)
    console.log(productsCategory)
  }
}