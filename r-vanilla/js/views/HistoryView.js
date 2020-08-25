import View from "./View.js";

const HistoryView = Object.create(View);

HistoryView.message = {
    NO_RESULT: '최근검색어가 없습니다.'
};

HistoryView.setup = function (el) {
    this.init(el);
    this.bindClickEvent();
    return this;
};

HistoryView.render = function (data = []) {
    this.show();
    this.el.innerHTML = data.length ?
        this.dataRender(data) : this.message.NO_RESULT;
};

HistoryView.dataRender = function (data) {
    return data.reduce((html, item, idx) => {
        html += `<li data-keyword="${item.keyword}">
                  ${item.keyword}
                  <span class="date">${item.date}</span>
                  <button class="btn-remove" data-keyword="${item.keyword}"></button>
                </li>`;
        return html;
    }, '<ul class="list">') + '</ul>';
};

HistoryView.bindClickEvent = function () {
    this.el.addEventListener('click', ({target}) => {
        if (target.tagName.toLowerCase() === 'li') {
            this.onClickKeyword(target.dataset.keyword);
        }

        if (target.className === 'btn-remove') {
            this.onRemove(target.dataset.keyword);
        }
    });
};

HistoryView.onClickKeyword = function (keyword) {
    this.emit('@click', {keyword: keyword});
};

HistoryView.onRemove = function (keyword) {
    this.emit('@remove', {keyword:keyword});
};

export default HistoryView;