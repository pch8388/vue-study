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
    this.removeEl.style.display = show ? 'block' : 'none';
};

FormView.bindEvents = function () {
    this.on('submit', e => e.preventDefault());
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e));
    this.removeEl.addEventListener('click', e => this.onClickReset(e));
};

FormView.onKeyup = function (e) {
    this.showResetBtn(this.inputEl.value.length);
    if (!this.inputEl.value.length) this.onClickReset(e);
    if (e.code !== 'Enter') return;
    this.emit('@submit', {input: this.inputEl.value});
};

FormView.onClickReset = function (e) {
    this.emit('@reset');
    this.showResetBtn(false);
};

export default FormView;