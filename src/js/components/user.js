
export default class User {
  constructor() {
    this.templateUserLogin()
    this.form = document.querySelector("#form-login");
    this.formName = document.querySelector("#form-name");
    this.formPass = document.querySelector("#form-pass");
    this.formConfirmPass = document.querySelector("#form-confirmPass");
    this.formEmail = document.querySelector("#form-email");
  }
  getUserStore() {
    const cacheExist = window.localStorage.getItem('user');
    if(cacheExist) {
      return JSON.parse(cacheExist);
    }
  }
  templateUserLogin() {
    const cache = this.getUserStore()
    if(cache !== undefined) {
      return `
        <div class="account__container">
          <h2>My Account</h2>
          <div class="account">
            <div class="account__info">
              <span>Name: </span>
              <span>${cache.name}</span>
            </div>
            <div class="account__info">
              <span>Email: </span>
              <span>${cache.email}</span>
            </div>
            <div class="account__action">
              <button class="button" id="close-session">Close Session</button>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="login__container">
          <h2>User Login</h2>
          <div class="message"></div>
          <form class="form" id="form-login">
            <div class="form__group">
              <label class="form__label">Name</label>
              <input type="text" class="form__input" id="form-name" required />
            </div>
            <div class="form__group">
              <label class="form__label">Password</label>
              <input type="password" class="form__input" id="form-pass" required />
            </div>
            <div class="form__group">
              <label class="form__label">Confirm Password</label>
              <input type="password" class="form__input" id="form-confirmPass" required />
            </div>
            <div class="form__group">
              <label class="form__label">Email</label>
              <input type="email" class="form__input" id="form-email" required />
            </div>
            <div class="form__group">
              <button class="form__action button">Login</button>
            </div>
          </form>
        </div>
      `;
    }
  }
  setUserStore(data) {
    window.localStorage.setItem('user', JSON.stringify(data));
  }
  submitForm() {
    const validationPass = this.formPass.value === this.formConfirmPass.value ? true : false;
    if (validationPass) {
      const userInfo = {
        name: this.formName.value,
        email: this.formEmail.value,
      };
      this.setUserStore(userInfo)
      location.reload()
    } else {
      const message = document.querySelector(".message")
      message.classList.add('error')
      message.innerHTML = `<p>Las contraseñas no coinciden</p>`;
      setTimeout(() => {
        message.innerHTML = ''
      }, 3000)
    }
  }
}