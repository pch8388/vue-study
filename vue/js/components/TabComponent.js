export default {
    template: '#tabs',
    props: ['tabs', 'selectedTab'],
    methods: {
        onClickTab(tabName) {
            this.$emit('@change', tabName);
        }
    }
}