import View from './View.js'

const tag = '[FormView]';

const FormView = Object.create(View);

FormView.setup = function (el) {
    this.init(el);
    this.inputEl = el.querySelector('[type=text]');
    this.resetEl = el.querySelector('[type=reset]');
    this.showResetBtn(false);
    this.bindEvents();
    return this;
};

FormView.showResetBtn = function (show = true) {
    this.resetEl.style.display = show ? 'block' : 'none';
};

FormView.bindEvents = function () {
    this.on('submit', e => e.preventDefault());
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e));
    this.resetEl.addEventListener('click', e => this.onReset(e));
};

FormView.onKeyup = function (e) {
    this.showResetBtn(this.inputEl.value.length);
    if (e.code !== 'Enter') return;
    this.emit('@submit', {input: this.inputEl.value});
};

FormView.onReset = function (e) {
    this.emit('@reset', {inputEl: this.inputEl});
    this.showResetBtn(this.inputEl.value.length);
};

export default FormView;