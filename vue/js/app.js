import SearchModel from "./models/SearchModel.js";
import KeywordModel from "./models/KeywordModel.js";

new Vue({
    el: '#app',
    data: {
        query: '',
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '',
        keywords: [],
        searchResult: []
    },
    created() {
        this.selectedTab = this.tabs[0];
        this.fetchKeyword();
    },
    methods: {
        onSubmit(e) {
            this.search();
        },
        onKeyup() {
            if (!this.query.length) this.resetForm();
        },
        onReset() {
            this.resetForm();
        },
        onClickKeyword(keyword) {
            this.query = keyword;
            this.search();
        },
        onClickTab(tabName) {
            this.selectedTab = tabName;
        },
        fetchKeyword() {
            KeywordModel.list().then(data => {
                this.keywords = data;
            });
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted = true;
                this.searchResult = data;
            });
        },
        resetForm() {
            this.query = '';
            this.submitted = false;
            this.searchResult = [];
        }
    }
});