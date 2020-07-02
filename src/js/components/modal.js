export default class Modal {
  constructor(template) {
    this.template = template
    this.modalContainer = document.querySelector('[data-modal]')
    this.modalContent = this.modalContainer.childNodes[1].children[0];
    this.showModal()
  }
  showModal() {
    this.modalContainer.classList.add('is-active')
    this.modalContent.innerHTML = this.template;
  }
  hideModal() {

  }
}