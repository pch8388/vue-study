import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";

import SearchModel from "../models/SearchModel.js";

const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setUp(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onReset());

        ResultView.setUp(document.querySelector('#search-result'));
    },
    onSubmit(input) {
        console.log(tag, 'onSubmit(', input, ')');
        SearchModel.list(input).then(data => {
            ResultView.render(data);
        });
    },
    onReset() {
        console.log(tag, 'onReset()');
        ResultView.hide();
    }
}