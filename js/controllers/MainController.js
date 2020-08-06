import FormView from '../views/FormView.js'

const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onReset(e.detail.inputEl));
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input);
    },

    onReset(inputEl) {
        inputEl.value = '';
        inputEl.focus();
    }
}