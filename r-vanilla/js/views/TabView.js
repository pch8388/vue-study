import View from "./View.js";

const TabView = Object.create(View);

TabView.setUp = function (el) {
    this.init(el);
    this.tabs = ['추천 검색어', '최근 검색어'];
    this.setActiveTab(this.tabs[0]);
    this.bindClickEvent();
    return this;
};

TabView.setActiveTab = function (tabName) {
    this.el.querySelectorAll('li').forEach(li => {
        li.className = li.innerText === tabName ? 'active' : '';
    });
    this.show();
};

TabView.bindClickEvent = function () {
    this.el.addEventListener('click', ({target}) => {
        if (target.tagName.toLowerCase() !== 'li') return;
        this.onClick(target.innerHTML);
    });
};

TabView.onClick = function (tabName) {
    this.setActiveTab(tabName);
    this.emit('@click', {tabName: tabName});
};

export default TabView;