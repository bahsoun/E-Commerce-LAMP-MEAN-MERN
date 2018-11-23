const routes = [
    {path: '/', component: AppHomePage},
    {path: '/category/:category', component: ProductsVeg, props: true},
    {path: '*', component: AppHomePage }
];

let appMain = new Vue({
    el: '#vueApp',
    props: {
        showDotMenu: false,
    },

    router:new VueRouter({/*mode: 'history',*/ routes }),
    data: {},
    components: {
        AppHeader,
        AppFrontMenu
    }
});
