let AppDotMenu = {
    data: function () {
        return {
            menuItems: [["Products", '/'], ['Basket', 'basket'], ['User Info', 'info'], ['Purchases', 'purchases'], ['Contact', 'contact']]
        }
    },

    template: `<nav id="dot-menu-full">
                    <ul>
                        <li v-for="menu in menuItems"><a v-bind:href="'#'+menu[1]">{{menu[0]}}</a></li>
                    </ul>
                </nav>`,
    methods: {}
};

let AppHomeCategories = {
    props: ['categories', 'parCss'],
    data: () => {
        return {parCss: ""}
    },
    template: `<div id="home-categories" :class="parCss">
                   <div v-for="cat in categories" :class="'home-category ' + cat[1]">
                        <router-link :to="'/category/'+cat[1]">{{cat[0]}}</router-link>
                   </div>
                </div>`,
    methods: {}
};


let AppHomeSlider = {
    data: function () {
        return {
            sliderCss: 'slider',
            isShadow: true,
            sliderProducts: ['lksda', '23dsa', 'apples'],
            topMenuItems: [['Veggies', 'veg'], ['Fruits', 'fruits'], ['Offers', 'offers'], ['Misc', 'misc']]
        }
    },
    template: `<div id="main-slider">
                    <ul id="latestOffersSlides" :class="[sliderCss]">
                        <li v-for="(slide, i) in sliderProducts" :class="{'active' : i === 0}" @click="pauseIt(i)">{{slide}}</li>
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

let AppHomePage = {
    props: ['categories'],
    data: function () {
        return {
            catos: [['Veggies', 'veg'], ['Fruits', 'fruits'], ['Offers', 'offers'], ['Misc', 'misc']]
        };
    },
    components: {AppHomeSlider, AppHomeCategories},
    template: `<div id="appHomePage">
                    <app-home-slider></app-home-slider>
                    <app-home-categories :categories=catos></app-home-categories>
                </div>`
};


let AppFrontMenu = {
    data: function () {
        return {
            topMenuItems: [['Veggies', 'veg'], ['Fruits', 'fruits'], ['Offers', 'offers'], ['Misc', 'misc']]
        }
    },
    template: `<nav class="front-menu">
                    <ul>
                    <router-link v-for="menu in topMenuItems" :to="{path:'/category/'+menu[1]}" append="false">
                        <li>{{menu[0]}}</li>
                    </router-link>
                    </ul>
                </nav>`,
    methods: {}
};


let AppSearch = {
    data: function () {
        return {}
    },
    components: {},
    template: `<input name="search" id="search" placeholder="Search for.." autocomplete="off" />
               `,
    methods: {}
};


let AppTopCart = {
    data: function () {
        return {}
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
    props: ['showDotMenu'],
    data: function () {
        return {
            logo: './img/logo.png'
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
                        <router-link to="/"><img class="logo" :src=logo /></router-link>
                        <!--<a href="#home"></a>-->
                    </div>
                </div>
               `,
    methods: {}
};

let ProductsVeg = {
    props: ['category'],
    data: function () {
        return {
            // cats:Object.keys(products.products),
            base: './img/prod/',
            // category:$route.params.elemo,
            items: ajaxData.products
        }
    },
    template: `<div class="category-listng">
                    <div v-for="item in items[category]" :class="'div-item-id item-id-' + item.id"  :item-id-attr="item.id" 
                    :item-price-attr="item.price" :item-catg-attr="item.type" :item-cart-attr="item.cartQty"> 
                        <div class='imgf'> 
                            <img :src="base + item.img"/> 
                        </div>
                        <br>
                        <h4>{{item.name}}</h4> 
                        <i :class="'itmAddOne add'+item.id+' AddOrSub icon-plus'">+</i> 
                        <p :class="'qty-p count' + item.id">{{item.cartQty || 0}}</p> 
                        <i :class="'itmRemoveOne minus'+item.id+' AddOrSub icon-minus'">-</i> 
                        <p class='price'>$<b>{{item.price}}</b>/{{item.qttTyp}}</p> 
                    </div>
                </div>`,
};