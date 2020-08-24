import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";
import KeywordView from "../views/KeywordView.js";

import SearchModel from "../models/SearchModel.js";
import KeywordModel from "../models/KeywordModel.js";

const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setUp(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onReset());

        TabView.setUp(document.querySelector('#tabs'))
            .on('@click', e => this.onClickTab(e.detail.tabName));

        ResultView.setUp(document.querySelector('#search-result'));

        KeywordView.setUp(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword));

        this.renderView();
    },
    renderView() {
        console.log(tag, 'renderView()');
        KeywordModel.list().then(data => KeywordView.render(data));
    },
    search(query) {
        FormView.setValue(query);
        SearchModel.list(query).then(data => {
            this.onSearchResult(data);
        });
    },
    onSearchResult(data) {
        TabView.hide();
        KeywordView.hide();
        ResultView.render(data);
    },
    onSubmit(input) {
        console.log(tag, 'onSubmit(', input, ')');
        this.search(input);
    },
    onReset() {
        console.log(tag, 'onReset()');
        ResultView.hide();
    },
    onClickTab(tabName) {
        console.log(tag, 'onClickTab(', tabName, ')');
    },
    onClickKeyword(keyword) {
        console.log(tag, 'onClickKeyword()');
        this.search(keyword);
    }
}