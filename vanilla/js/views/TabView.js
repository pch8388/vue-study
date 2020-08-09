import View from './View.js'

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.setup = function (el) {
    this.init(el);
    this.bindEvents();
    return this;
};

TabView.setActiveTab = function (tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'active' : '';
    });
    this.show();
};

TabView.bindEvents = function () {
    this.el.addEventListener('click', ({target}) => {
        if (target.tagName.toLocaleLowerCase() !== 'li') return;

        this.onClick(target.innerHTML);
    });
};

TabView.onClick = function (tabName) {
    this.setActiveTab(tabName);
    this.emit('@change', {tabName: tabName});
};

export default TabView;