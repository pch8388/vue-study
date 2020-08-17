<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form v-bind:value="query" v-on:@submit="onSubmit"
                   v-on:@reset="onReset"></search-form>

      <div class="content">
        <div v-if="submitted">
          <search-result v-bind:data="searchResult"
                         v-bind:query="query"></search-result>
        </div>
        <div v-else>
          <tabs v-bind:tabs="tabs" v-bind:selected-tab="selectedTab"
                v-on:@change="onClickTab"></tabs>

          <div v-if="selectedTab === tabs[0]">
            <list v-bind:data="keywords" type="keywords" v-on:@click="onClickKeyword"></list>
          </div>
          <div v-else>
            <list v-bind:data="history" type="history" v-on:@click="onClickKeyword"
                  v-on:@remove="onRemoveHistory"></list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HistoryModel from "../../vue/js/models/HistoryModel";
import KeywordModel from "../../vue/js/models/KeywordModel";
import SearchModel from "../../vue/js/models/SearchModel";

import FormComponent from "./components/FormComponent.vue";
import ResultComponent from "./components/ResultComponent.vue";
import ListComponent from "./components/ListComponent.vue";
import TabComponent from "./components/TabComponent.vue";

export default {
  name: 'app',
  data () {
    return {
      query: '',
      submitted: false,
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      keywords: [],
      history: [],
      searchResult: []
    }
  },
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'list': ListComponent,
    'tabs': TabComponent
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchKeyword();
    this.fetchHistory();
  },
  methods: {
    onSubmit(query) {
      this.query = query;
      this.search();
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
    onRemoveHistory(keyword) {
      HistoryModel.remove(keyword);
      this.fetchHistory();
    },
    fetchKeyword() {
      KeywordModel.list().then(data => {
        this.keywords = data;
      });
    },
    fetchHistory() {
      HistoryModel.list().then(data => {
        this.history = data;
      });
    },
    search() {
      SearchModel.list().then(data => {
        this.submitted = true;
        this.searchResult = data;
        this.addHistory();
      });
    },
    addHistory() {
      HistoryModel.add(this.query);
      this.fetchHistory();
    },
    resetForm() {
      this.query = '';
      this.submitted = false;
      this.searchResult = [];
    }
  }
}
</script>
