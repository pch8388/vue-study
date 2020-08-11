import SearchModel from "./models/SearchModel.js";

new Vue({
    el: '#app',
    data: {
        query: '',
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '',
        searchResult: []
    },
    created() {
        this.selectedTab = this.tabs[0];
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
        onClickTab(tabName) {
            this.selectedTab = tabName;
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