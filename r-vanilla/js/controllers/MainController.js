import FormView from "../views/FormView.js";

import SearchModel from "../models/SearchModel.js";

const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setUp(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onReset());
    },
    onSubmit(input) {
        SearchModel.list(input).then(data => {
            console.log(tag, 'onSubmit()');
            console.log(tag, 'data ==> ', data);
        });
    },
    onReset() {
        console.log(tag, 'onReset()');
    }
}