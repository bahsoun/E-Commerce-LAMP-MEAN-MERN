let appMain = new Vue({
    el: '#vueApp',
    props: {
        showDotMenu: false,
        ms: 'dd'
    },
    data: {},
    components: {
        AppHeader,
        AppFrontMenu
    }
});

let appContent = new Vue({
    el: '#mainContents',
    data: {
        parCss: "border red-border",
        catos: [['Veggies', 'veg'], ['Fruits', 'fruits'], ['Offers', 'offers'], ['Misc', 'misc']]
    },

    components: {
        AppHomeSlider,
        AppHomeCategories
    }
});