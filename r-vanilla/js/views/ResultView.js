import View from "./View.js";

const ResultView = Object.create(View);

const tag = '[ResultView]';

ResultView.message = {
    NO_RESULT: '검색결과가 없습니다.'
};

ResultView.setUp = function (el) {
    this.init(el);
};

ResultView.render = function (data = []) {
    this.el.innerHTML = data.length ?
        this.dataRender(data) : this.message.NO_RESULT;
    this.show();
};

ResultView.dataRender = function (data) {
    return data.reduce((html, item) => {
        html += this.getHtml(item);
        return html;
    }, '<ul>') + '</ul>';
};

ResultView.getHtml = function (item) {
    return `<li>
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
          </li>`;
};

export default ResultView;