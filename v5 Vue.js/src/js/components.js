let AppDotMenu = {
    // props:['showDotMenu'],
    data: function () {
        return {
            menuItems: [["Products", 'home'], ['Basket', 'basket'], ['User Info', 'info'], ['Purchases', 'purchases'], ['Contact', 'contact']]
        }
    },

    template: `<nav id="dot-menu-full">
                    <ul>
                    <!--<li>aaa</li>-->
                    <!--<li>bbb</li>-->
                        <li v-for="menu in menuItems"><a v-bind:href="'#'+menu[1]">{{menu[0]}}</a></li>
                    </ul>
                </nav>`,
    methods: {}
};

let AppHomeCategories = {
    props:  ['categories','parCss'],
    data:()=>{return {parCss:""}},
    template: `<div id="home-categories" :class="parCss">
                   <div v-for="cat in categories" :class="'home-category ' + cat[1]">
                        <a v-bind:href="cat[1]">{{cat[0]}}</a>
                   </div>
                </div>`,
    methods: {}
};


let AppHomeSlider = {
    // props:['sliderProducts'],
    props:{ },
    data: function () {
        return {
            sliderCss:'slider',
            isShadow:true,
            topMenuItems: [['Veggies', 'veg'], ['Fruits', 'fruits'], ['Offers', 'offers'], ['Misc', 'misc']]
        }
    },

    template: `<div id="main-slider">
                    <ul id="latestOffersSlides" :class="[sliderCss]">
                    <!--<ul :class="[sliderCss,{shadows:isShadow}]">-->
                        <li class="active" @click="pauseIt(1)" >lksda</li>
                    </ul>
                </div>`,
    methods: {
        pauseIt: (id) => {
            setTimeout(() => {
                console.log(id);
            }, 9000);
        }
    }
};


let AppFrontMenu = {
    data: function () {
        return {
            topMenuItems: [['Veggies', 'veg'], ['Fruits', 'fruits'], ['Offers', 'offers'], ['Misc', 'misc']]
        }
    },
    template: `<nav class="front-menu">
                    <ul>
                        <li v-for="menu in topMenuItems"><a v-bind:href="'#'+menu[1]">{{menu[0]}}</a></li>
                    </ul>
                </nav>`,
    methods: {}
};


let AppSearch = {
    data: function () {
        return {
            logoa: './img/logo.png'
        }
    },
    components: {},
    template: `<input name="search" id="search" placeholder="Search for.." autocomplete="off" />
               `,
    methods: {}
};


let  AppTopCart= {
    data: function () {
        return {
            logoa: './img/logo.png'
        }
    },
    components: {},
    template: `<div id="basket-cart">
                    <img src="./img/basket1.png">
                    <h4 id="allprice">$ <span>0</span></h4>
                    <a href="#basket" id="btnCallBasket" class="ui-btn bassss">Order Now</a>
                </div>
               `,
    methods: {}
};


let AppHeader = {
    props:['showDotMenu'],
    data: function () {
        return {
            logoa: './img/logo.png'
        }
    },
    components: {
        AppDotMenu,
        AppTopCart,
        AppSearch
    },
    template: `<div class="mainHeader">
                    <div class="topLeft">
                        <app-dot-menu v-show="showDotMenu"></app-dot-menu>
                        <i class="dot-menu-icon" @click="showDotMenu=!showDotMenu">M</i>
                        <!--<i class="dot-menu" @mouseover="showDotMenu=true" @mouseout="showDotMenu=false">M</i>-->
                        <i class="contact-me">P</i>
                        <app-top-cart></app-top-cart>
                    </div>
                    <div class="topRight">
                        <app-search></app-search>
                        <a href="#home"><img class="logo" src="./img/logo.png" /></a>
                    </div>
                </div>
               `,
    methods: {}
};

