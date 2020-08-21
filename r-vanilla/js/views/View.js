export default {
    init(el) {
        if (!el) throw el;
        this.el = el;
        return this;
    },
    on(event, handler) {
        this.el.addEventListener(event, handler);
        return this;
    },
    emit(event, data) {
        this.el.dispatchEvent(
            new CustomEvent(event, {detail: data}));

        return this;
    },
    hide() {
        this.el.style.display = 'none';
        return this;
    },
    show() {
        this.el.style.display = '';
        return this;
    }
}