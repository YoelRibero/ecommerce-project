
export default class User {
  constructor() {
    this.render()
  }
  createTemplate(HTMLString) {
		const html = document.implementation.createHTMLDocument()
		html.body.innerHTML = HTMLString
		return html.body.children[0]
  }
  templateUser() {
    return `
      <h2>User Login</h2>
    `
  }
  render() {
    const HTML = this.templateUser();
    return this.createTemplate(HTML);
  }
}