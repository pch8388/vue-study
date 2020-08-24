import View from "./View.js";

const KeywordView = Object.create(View);

KeywordView.message = {
    NO_RESULT: '추천검색어가가 없습니다.'
};

KeywordView.setUp = function (el) {
    this.init(el);
    this.bindClickEvent();
    return this;
};

KeywordView.render = function (data = []) {
    this.el.innerHTML = data.length ?
        this.dataRender(data) : this.message.NO_RESULT;
};

KeywordView.dataRender = function (data) {
    return data.reduce((html, item, idx) => {
        html += `<li data-keyword="${item.keyword}">
                  <span class="number">${idx + 1}</span>
                  ${item.keyword}
                </li>`;
        return html;
    }, '<ul class="list">') + '</ul>';
};

KeywordView.bindClickEvent = function () {
    this.el.addEventListener('click', ({target}) => {
        if (target.tagName.toLowerCase() !== 'li') return;
        this.onClickKeyword(target.dataset.keyword);
    });
};

KeywordView.onClickKeyword = function (keyword) {
    this.emit('@click', {keyword:keyword});
};

export default KeywordView;