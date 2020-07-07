export default class OrderConfirmation {
  constructor() {
    this.name = document.querySelector('.checkout__name')
    this.email = document.querySelector('.checkout__email')
    this.address = document.querySelector('.checkout__address')
    this.deliveryAddress = document.querySelector('.checkout__deliveryAddress')
  }
  renderData() {
    const data = JSON.parse(window.localStorage.getItem('user'))
    console.log(data)
    const { name, email, address, addressDelivery } = data
    this.name.textContent = name
    this.email.textContent = email
    this.address.textContent = address
    this.deliveryAddress.textContent = addressDelivery
  }
}