import View from "./View.js";

const FormView = Object.create(View);

const tag = '[FormView]';

FormView.setUp = function (el) {
    this.init(el);
    this.inputEl = el.querySelector('[type=text]');
    this.removeEl = el.querySelector('[type=reset]');
    this.showResetBtn(false);
    this.bindEvents();
    return this;
};

FormView.showResetBtn = function (show = true) {
    this.removeEl.style.display = show ? 'block': 'none';
};

FormView.bindEvents = function () {
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e));
};

FormView.onKeyup = function (e) {
    this.showResetBtn(this.inputEl.value.length);
};

export default FormView;