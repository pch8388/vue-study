import View from "./View.js";

const FormView = Object.create(View);

const tag = '[FormView]';

FormView.setUp = function (el) {
    this.init(el);
    this.inputEl = el.querySelector('[type=text]');
    this.removeEl = el.querySelector('[type=reset]');
    this.showResetBtn(false);
    return this;
};

FormView.showResetBtn = function (show = true) {
    this.removeEl.style.display = show ? 'block': 'none';
};

export default FormView;