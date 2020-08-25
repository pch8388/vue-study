import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";
import KeywordView from "../views/KeywordView.js";
import HistoryView from "../views/HistoryView.js";

import SearchModel from "../models/SearchModel.js";
import KeywordModel from "../models/KeywordModel.js";
import HistoryModel from "../models/HistoryModel.js";

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

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword))
            .on('@remove', e => this.onRemove(e.detail.keyword));

        this.tabs = ['추천 검색어', '최근 검색어'];
        this.selectedTab = this.tabs[0];
        this.renderView();
    },
    renderView() {
        console.log(tag, 'renderView()');
        this.onClickTab(this.selectedTab);
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
        HistoryView.hide();
        ResultView.render(data);
    },
    onSubmit(input) {
        console.log(tag, 'onSubmit(', input, ')');
        this.search(input);
    },
    onReset() {
        console.log(tag, 'onReset()');
        ResultView.hide();
        TabView.show();
        this.renderView();
    },
    onClickTab(tabName) {
        console.log(tag, 'onClickTab(', tabName, ')');
        this.selectedTab = tabName;
        if (tabName === '추천 검색어') {
            HistoryView.hide();
            KeywordModel.list().then(data => KeywordView.render(data));
        } else {
            KeywordView.hide();
            HistoryModel.list().then(data => HistoryView.render(data));
        }
    },
    onClickKeyword(keyword) {
        console.log(tag, 'onClickKeyword()');
        HistoryModel.add(keyword);
        this.search(keyword);
    },
    onRemove(keyword) {
        HistoryModel.remove(keyword);
        this.renderView();
    }
}