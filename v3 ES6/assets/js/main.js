//ES5 Version

//Clear Storage on new logic

// 1 - Vars declarations
let user,
    usrInf = {},
    usrInfStrgF,
    allProducts_Glob;
//END Vars declarations

// 2 - START CLASSES DECLARATIONS

// 2 - 1 - START PRODUCTS CLASS PROPERTIES AND METHODS
class ObjectProduct {
    constructor(objID) {
        this.id = objID.id;
        this.name = objID.name;
        this.img = objID.img;
        this.price = objID.price;
        this.offer = objID.offer;
        this.type = (this.offer == 1 ? "offers" : objID.type);
        this.qttTyp = objID.qttTyp;
        this.slider = objID.slider;
        this.cartQty = cartBasketInit.getQtt(this.id);
        this.base = "./assets/img/prod/";
        this.iClasses = ' AddOrSub ui-btn ui-corner-all ui-btn-icon-notext ui-icon-';
    }

    productsListing() {
        return `<div class='div-item-id item-id-${this.id} ui-block-b'  item-id-attr='${this.id}' 
                    item-price-attr='${this.price}' item-catg-attr='${this.type}' item-cart-attr='${this.cartQty}'> 
                    <div class='imgf'> 
                        <img src='${this.base + this.img}'/> 
                    </div>
                    <br>
                    <h4>${this.name}</h4> 
                    <i class='itmAddOne add${this.id} ${this.iClasses}plus'>+</i> 
                    <p class='ppp count${this.id}'>${this.cartQty}</p> 
                    <i class='itmRemoveOne minus${this.id} ${this.iClasses}minus'>-</i> 
                    <p class='price'><b> $${this.price}</b>/${this.qttTyp}</p> 
                </div>`;
    };

    sliderListing() {
        return `<div class=scol>
                    <img src='${this.base + this.img }'/>
                    <div class='aside'>
                        <div class='itemName'>${this.name}</div>
                        <div class='itemQttCtrl div-item-id item-id-${this.id}' item-id-attr='${this.id}' item-price-attr='${this.price}' item-catg-attr='${this.type}' item-cart-attr='${this.cartQty}'>
                            <i class='itmAddOne add${this.id} ${this.iClasses}plus'>+</i>
                            <p class='ppp count${this.id }'>${this.cartQty }</p>
                            <i class='itmRemoveOne minus${this.id} ${this.iClasses} minus'>-</i>
                        </div>
                        <div class='itemPrice'>
                            <b>$${this.price}<b>
                        </div>
                    </div>
                "</div>`;
    };

    searchListing() {
        return `<tr>
                    <td>
                        <div class='div-item-id item-id-${this.id} ui-block-b' item-id-attr='${this.id}' item-price-attr='${this.price}' item-catg-attr='${this.type}' item-cart-attr='${this.cartQty}' style='width:100% !important;'>
                            <div class='imgf'>
                                <img src='${this.base + this.img}' />
                            </div>
                            <br>
                            <h4>${this.name}</h4>
                            <i class='itmAddOne add${this.id} ${this.iClasses}plus'>+</i>
                            <p class='ppp count${this.id}'>${this.cartQty}</p>
                            <i class='itmRemoveOne minus${this.id} ${this.iClasses}minus'>-</i>
                            <p>
                                <b> $${this.price}</b>/<b>${this.type}</b>
                            </p>
                        </div>
                    </td>
                </tr>
            `;
    };
}

// END PRODUCTS CLASS PROPERTIES AND METHODS


// 2 - 2 - START CART CLASS PROPERTIES AND METHODS

class CartBasket {
    constructor() {
        this.cart = {cartTotal: 0, items: {}};
    }


    init() {
        this.initUpdtCart();
        this.getCartItems();
        this.cart = {cartTotal: 0, items: {}};
    };

    initUpdtCart() {
        if (JSON.parse(localStorage.getItem('cart')) !== null) {
            this.cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            this.saveCart();
        }
    };

    saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    };

    sync() {
        //Sync between browser pages, could also sync over multiple devices,
        // but making multiple buying baskets/carts that customer can choose from or resume
        // synced via db or websocket
        //Update : item (attr, text), basket (div),let cart(items[id]),LS(from cart)
        this.initUpdtCart();
        this.calcCartTotal();

        if (Object.keys(this.cart.items).length > 0) {
            let items = this.cart.items;
            Object.keys(items).forEach((itemId) => {
                let thisItem = items[itemId];
                //If Item exists don't append again
                if (jQuery("div#mybasket .item-id-" + itemId).length === 0) {
                    // console.log(jQuery("div#mybasket .item-id-" + itemId).text());
                    jQuery("div#mybasket").append((new ObjectProduct(items[itemId])).productsListing());
                }

                //Update/sync the qty if >= 1, Used for syncing if qty modified from other page tab,
                // to same element existing in category/listing, cart/basket, & also search
                jQuery(".count" + itemId).text(items[itemId].qtty).parents(".item-id-" + itemId).attr("item-cart-attr", items[itemId].qtty);

                //Update/sync the qty if = 0, Check available items in the cart/basket page in html,
                //And compare to cart LS, then remove the items that aren't anymore
                let item = document.querySelectorAll("div#mybasket .div-item-id");
                // let item = jQuery("div#mybasket .div-item-id");
                Object.keys(item).forEach((key) => {
                    // console.log(key, item[key]);
                    let itemId = jQuery(this).attr("item-id-attr");
                    if (this.cart.items[itemId] === undefined
                        || this.cart.items[itemId] === null) {
                        jQuery("div#mybasket .item-id-" + itemId).remove();
                        jQuery(".count" + itemId).text(0).parents(".item-id-" + itemId).attr("item-cart-attr", 0);
                    }
                });
                // console.log("-----------");
            });
        } else {
            //Used for sync, remove all items if no items inside cart LS
            jQuery("div.div-item-id p.ppp").text(0);
            jQuery("div.div-item-id").attr("item-cart-attr", 0);
            jQuery("div#mybasket .div-item-id").remove();
        }

        //set Total even if 0, used for init
        jQuery('h4#allprice').text("$" + this.cart.cartTotal);
        this.chkBasktEmpty();
        this.getCartItems();
    };

    getQtt(itemId) {
        // console.log(cart,itemId);
        if (Object.keys(this.cart.items).length > 0 && this.cart.items[itemId] !== null && this.cart.items[itemId] !== undefined) {
            return Number(this.cart.items[itemId].qtty);
        } else {
            return 0;
        }
    };

    getCartItems() {
        this.calcCartTotal();
        if (Object.keys(this.cart.items).length > 0) {
            let items = this.cart.items;
            // $.each(this.cart.items, function (itemId, item) {
            Object.keys(items).forEach((itemId) => {
                let item = items[itemId];                //If Item exists don't append again
                if (jQuery("div#mybasket .item-id-" + itemId).length === 0) {
                    jQuery("div#mybasket").append((new ObjectProduct(item)).productsListing());
                }

                //Update/sync the qty, Used for syncing if qty modified from other page tab,
                // to same element existing in category/listing, cart/basket, & also search
                jQuery(".count" + itemId).text(item.qtty).parents(".item-id-" + itemId).attr("item-cart-attr", item.qtty);
            });
        }

        //set Total even if 0, used for init
        jQuery('h4#allprice').text("$" + this.cart.cartTotal);
        this.chkBasktEmpty();
    };

    getFinalBasket() {
        if (JSON.parse(localStorage.getItem('cart')) !== null) {
            this.cart = JSON.parse(localStorage.getItem('cart'));
        }
        return this.cart.items;
    }

    calcCartTotal() {
        let cartTotal = 0;
        if (Object.keys(this.cart.items).length !== 0) {
            let items = this.cart.items;
            Object.keys(items).forEach((itemId) => {
                let item = items[itemId];
                // $.each(this.cart.items, function (itemId, item) {
                cartTotal += item.qtty * item.price;
            });
        }
        if (cartTotal !== this.cart.cartTotal) {
            console.warn(`ERROR : Total Calc Mismatch 
                            Real Cart Total ${cartTotal}
                            Modified Cart Total ${this.cart.cartTotal}
                            Setting the real Total to ${cartTotal} !`
            );
            this.cart.cartTotal = cartTotal;
            jQuery('h4#allprice').text("$" + cartTotal);
        }
        this.saveCart();
    };

    chkBasktEmpty() {
        if (Object.keys(this.cart.items).length === 0) {
            jQuery("div#basket").addClass("empty");
        } else {
            jQuery("div#basket").removeClass("empty");
        }
    };

    addSubItem(item, operation) {
        let id = item.id,
            itmCartQty = this.getQtt(id),
            cartTotal = this.cart.cartTotal;

        //Add / Sub operation
        if (operation === "add") {
            ++itmCartQty;
            cartTotal = Number(cartTotal) + Number(item.price);
        } else if (operation === "sub" && itmCartQty > 0) {
            --itmCartQty;
            cartTotal = Number(cartTotal) - Number(item.price);
            if (itmCartQty < 1) {
                delete this.cart.items[id];
                jQuery("div#mybasket .item-id-" + id).remove();
            }
        }

        //If Item qty > 1 add to cart obj & save to LS,
        if (itmCartQty > 0) {
            this.cart.items[id] = {
                "id": id,
                "name": item.name,
                "img": item.img,
                "cssClass": item.cssClass,
                "price": item.price,
                "qtty": itmCartQty,
                "type": item.type,
                "qttTyp": item.qttTyp,
                "offer": item.offer,
                "slider": item.slider
            };
            //Used in case we dont want to refresh the cart
            //If Item is not set in basket and qty >1, add it
            if (jQuery("div#mybasket .item-id-" + id).length === 0) {
                jQuery("div#mybasket").append((new ObjectProduct(this.cart.items[id])).productsListing());
            }
        }

        //Update Qty on item (text & attribute) in both pages : basket & category listing
        jQuery(".count" + id).text(itmCartQty).parents(".item-id-" + id).attr("item-cart-attr", itmCartQty);

        //Set Total Price
        jQuery('h4#allprice').text("$" + cartTotal);
        this.cart.cartTotal = cartTotal;

        //Save to Localstorage & Check if cart/basket is empty or not to show/hide related divs
        this.saveCart();
        this.chkBasktEmpty();
    };


    resetCart() {
        this.cart = {cartTotal: 0, items: {}};
        this.saveCart();
        this.getCartItems();
    };
}

// END CART CLASS PROPERTIES AND METHODS

// END CLASSES DECLARATION


// 3 - START Init : START CREATE CART CLASS INSTANCE

// 3 - 1 - Creating cartBasket Object
let cartBasketInit = new CartBasket();
// 3 - 2 - Init / Add JQM header, footer, and panel outside
jQuery(function () {
    jQuery("[data-role=header],[data-role=footer]").toolbar().enhanceWithin();
    jQuery("[data-role=panel]").panel().enhanceWithin();
});

// 3 - 3 - Init when page is loaded
jQuery(document).ready(function () {

    //tttrev
    cartBasketInit.init();

    //Sending AJAX to Request Products and store
    getProd();

    //If logged in (token exists),
    // Sending AJAX to Request User info & account,
    //Token is in Session Variable and checked on the backend
    let token = localStorage.getItem('token');
    if (token !== null && token.length > 650) {
        usrInfo();
        usrAcc();
    }

});

// END Init


// 4 - START EVENTS REGISTRATION CLICK & WORKING
// 4 - 1 - ADD OR REMOVE ITEMS FROM CART on click

jQuery(document).on("click", "i.AddOrSub", function () {
    let thisType = jQuery(this).parents(".div-item-id").attr("item-catg-attr"),
        thisItemId = jQuery(this).parents(".div-item-id").attr("item-id-attr"),
        thisItem = allProducts_Glob[thisType][thisItemId];
    if (jQuery(this).hasClass("itmAddOne")) {
        cartBasketInit.addSubItem(thisItem, "add");
    } else if ((jQuery(this).hasClass("itmRemoveOne"))) {
        cartBasketInit.addSubItem(thisItem, "sub");
    }
});

jQuery(document).ready(function () {

// 4 - 1 - Also ADD / REMOVE, but for search div
    //Separate on click event for search items
    jQuery("div#searchresult td i.AddOrSub").click(function () {
        let thisType = jQuery(this).parents(".div-item-id").attr("item-catg-attr"),
            thisItemId = jQuery(this).parents(".div-item-id").attr("item-id-attr"),
            thisItem = allProducts_Glob[thisType][thisItemId];
        if (jQuery(this).hasClass("itmAddOne")) {
            cartBasketInit.addSubItem(thisItem, "add");
        } else if ((jQuery(this).hasClass("itmRemoveOne"))) {
            cartBasketInit.addSubItem(thisItem, "sub");
        }
    });

// 4 - 2 - SEARCH
    let divSrch = "div#searchresult";
    jQuery(document).on("focus keyup", "input#search", function (e) {
        // console.log(e);
        jQuery(divSrch).show();
        let value = jQuery(this).val().toLowerCase();
        jQuery("table#allsearch tr").each(function () { //arg tr index
            let row = jQuery(this);
            let id = row.find("td h4").text().toLowerCase();
            if (id.indexOf(value) < 0) {
                row.hide();
            } else {
                row.show();
            }
        });
    });
    jQuery("input#search").focusin(function () {
        jQuery(divSrch).show();
    });
    jQuery(divSrch).focus(function () {
        jQuery(divSrch).show();
    });
    jQuery(window).click(function (e) {
        if (!$(e.target).hasClass("search")) {
            jQuery(divSrch).hide();
        }
    });
    jQuery(divSrch).click(function (event) {
        event.stopPropagation();
    });
    jQuery('fieldset#header2 div#menubutton + .ui-block-b').click(function (event) {
        event.stopPropagation();
    });
// END SEARCH

// 4 - 3 - Cart re-init/update/sync on event re-init
    //Re-init Cart when going to the basket, in case data added from another page
    jQuery('a#bassss,a#btnCallBasket').click(function (e) {
        cartBasketInit.sync();
    });
    window.addEventListener('focus', function () {
        cartBasketInit.sync();
    });
});

// 4 - 4 - Assign or Remove Active Class for top menu, Logic to be modified
jQuery(document).on("pageshow", function () {
    let type = window.location.hash.substr(1),
        obj = {veg: 'a', fruits: 'b', offers: 'c', misc: 'd', basket: '', '': ''};
    let nav = "div#navbar ul.ui-grid-b li";
    jQuery(nav).removeClass("active");
    jQuery(nav + ".ui-block-" + obj[type]).addClass("active");
});
// END CLICK & WORKING EVENTS REGISTRATIONS


// 5 - START AJAX REQUESTS

// 5 - 1 - START USER INFO//
// 5 - 1 - 1 - GET USER INFO & SET
let usrInfo = (function () {
    (async () => {
        try {
            let Prod = {};
            const GetUserInfo = await fetch("./apiToken.php?reqo=GetUserInfo", {
                method: "POST",
                body: {token: localStorage.getItem('token')}
            });
            const jsonAp = await GetUserInfo.json();
            const usrInf = await JSON.parse(jsonAp.userInfo);

            if (await jsonAp.Error === "Token Mismatch") {
                window.location.href = "./login.html";
            } else {
                await (() => {
                    Object.keys(usrInf).forEach((key) => {
                        // $.each(JSON.parse(data.userInfo), function (key, val) {
                        usrInf[key] = usrInf[key];
                    });
                    localStorage.setItem("usrInfF", JSON.stringify(usrInf));
                    usrInfStrgF = JSON.parse(localStorage.getItem("usrInfF"));

                    //Assign to HTML the Values of user info if logged
                    let city = jQuery("<h4>" + usrInfStrgF.current + "</h4>"),
                        ids = ["uname", "uphone", "uwhatsapp", "uadd1", "uadd2"],
                        vals = ["name", "phone", "whatsapp", "address", "current"];

                    jQuery("select#city").append(city);
                    jQuery("h3#userid").text(usrInfStrgF.name);

                    Object.keys(ids).forEach((k) => {
                        let v = ids[k];
                        // $.each(ids, function (k, v) {
                        //check if all are inputs
                        jQuery("input#" + v).val(usrInfStrgF[vals[k]]);
                    });

                    //Logic to be modified later
                    if (usrInf !== '') {
                        jQuery('.notlog').hide();
                        jQuery('.log').show();
                    }
                })();
            }

            //get data
            await Object.keys(productsJSON).forEach(function (key) {
                Prod[key] = productsJSON[key];
            });
            await localStorage.setItem("Prod", JSON.stringify(Prod));
            allProducts_Glob = await JSON.parse(localStorage.getItem("Prod"));
            //Rendering to html
            await  getAllItems();

            //init slider
            await slider();
        }
        catch (e) {
            console.log(`Error ${e}`);
        }
    })();
});

// 5 - 1 - 2 - GET USER ACC HISTORY & ACCOUNT DETAILS
let usrAcc = (function () {
    (async () => {
        try {
            let accSum = {}, accSumStrgF = {};
            const GetUserTransSum = await fetch("apiToken.php?reqo=GetUserTransSum", {
                method: "POST",
                body: {token: localStorage.getItem('token')}
            });
            const jsonAp = await GetUserTransSum.json();
            const usrTrans = await JSON.parse(jsonAp.userTransact);

            if (await jsonAp.Error === "Token Mismatch") {
                window.location.href = "./login.html";
            } else {
                await (() => {
                    Object.keys(usrTrans).forEach((key) => {
                        // $.each(JSON.parse(data.userTransact), function (key, val) {
                        accSum[val.id] = usrTrans[key];
                    });
                    localStorage.setItem("accSum", JSON.stringify(accSum));
                    accSumStrgF = JSON.parse(localStorage.getItem("accSum"));
                })();
            }
        }
        catch (e) {
            console.log(`Error ${e}`);
        }
    })();

    //Account History Details
    (async () => {
        try {
            let accDet = {},
                accDetStrgF;
            const GetUserTransactDet = await fetch("apiToken.php?reqo=GetUserTransactDet", {
                method: "POST",
                body: {token: localStorage.getItem('token')}
            });
            const jsonAp = await GetUserTransactDet.json();
            const usrTransDet = await JSON.parse(jsonAp.userTransactDet);

            if (await jsonAp.Error === "Token Mismatch") {
                window.location.href = "./login.html";
            } else {
                await (() => {
                    Object.keys(usrTransDet).forEach((key) => {
                        accDet[key] = usrTransDet[key];
                    });
                    localStorage.setItem("accDet", JSON.stringify(accDet));
                    accDetStrgF = JSON.parse(localStorage.getItem("accDet"));

                    //Assign to HTML Values Of Account History for this user
                    let idb;
                    jQuery("div#myaccount table").append("<tr><td style='width: 25px;'> Num  </td><td style='    width: 61px;'>Total </td><td style='    width: 166px;'>Date</td></tr>");
                    Object.keys(accSumStrgF).forEach((k) => {
                        // $.each(accSumStrgF, function (k) {
                        idb = accSumStrgF[k];
                        let trData = jQuery("<tr class='" + idb.id + " AccDetN' invoice-id=" + idb.id + "><td>" + (Number(k) + 1) + "</td><td> $ <b> " + idb.tp + " </b></td><td>" + idb.datetime + "</td></tr>");
                        jQuery("div#myaccount table").append(trData);
                    });

                    //On Click on an Invoice, Assign Invoice Details to the HTML
                    jQuery(".AccDetN").click(function () {
                        let idbd = jQuery(this).attr("invoice-id");
                        jQuery("div#thisorderinfo .history").empty();
                        let thisorderprice = 0;
                        let jqTbl = "div#thisorderinfo table";
                        jQuery(jqTbl).empty()
                            .append("<tr><td style='width: 130px;'> Type  </td><td style='width: 14px;'>Qty </td><td style='    width: 55px;'>Price</td></tr>");
                        Object.keys(accDetStrgF[idbd]).forEach((keyy) => {
                            let vall = accDetStrgF[idbd][key];
                            // $.each(accDetStrgF[idbd], function (keyy, vall) {
                            let oo = jQuery("<tr><td>" + vall.product + "</td><td> " + vall.quantity + " </td> <td>" + vall.price + " $ </td></tr>");
                            jQuery("div#thisorderinfo table").append(oo);
                            thisorderprice += Number(vall.price * vall.quantity);
                        });
                        jQuery(jqTbl).append("<tr><td colspan=3><b>Total <b> " + accSumStrgF[idbd]['tp'] + " $ </td></tr>");
                        // jQuery(jqTbl).append("<tr><td colspan=3><b>Total <b> " + thisorderprice + " $ </td></tr>");
                        jQuery("div#thisorderinfo").append("<div class=history><a href='javascript: window.history.back();'> Go Back</a></div>");
                        $.mobile.changePage("div#thisorder");
                    });
                })();
            }
        }
        catch (e) {
            console.log(`Error ${e}`);
        }
    })();
});

// 5 - 1 - 3 - edit, update user info
jQuery(document).ready(function () {
    jQuery('input#updateaccount').click(function () {
        let data = jQuery("form#updateinfo").serialize();
        data += "&token=" + localStorage.getItem('token');
        (async () => {
            try {
                let accSum = {}, accSumStrgF = {};
                const UpdtUsrInf = await fetch("apiToken.php?reqo=UpdtUsrInf", {
                    method: "POST",
                    body: data
                });
                const jsonAp = await UpdtUsrInf.json();
                const usrTrans = await JSON.parse(jsonAp.userTransact);

                if (await jsonAp.Error === "Token Mismatch") {
                    window.location.href = "./login.html";
                } else {
                    await (() => {
                        // console.log(usrTrans);
                    })();
                }
            }
            catch (e) {
                console.log(`Error ${e}`);
            }
        })();
    });
});

// 5 - 2 - Get All classes Grouped as Objects by Categories including slider and offer
let getProd = async () => {
    try {
        let Prod = {};
        const getProducts = await fetch("apiToken.php?reqo=getProducts");
        const jsonAp = await getProducts.json();
        const productsJSON = await JSON.parse(jsonAp.products);

        await (() => {
            //get data
            Object.keys(productsJSON).forEach(function (key) {
                Prod[key] = productsJSON[key];
            });
            localStorage.setItem("Prod", JSON.stringify(Prod));
            allProducts_Glob = JSON.parse(localStorage.getItem("Prod"));
            //Rendering to html
            getAllItems();

            //init slider
            slider();
        })();
    }
    catch (e) {
        console.log(`Error ${e}`);
    }
};

//END AJAX REQUESTS


// 6 - RENDERING Functions

// 6 - 1 - PRODUCTS INTO HTML FROM LOCAL OBJECTS
// 6 - 1 - CREATING PRODUCTS : CATEGORIES, SLIDER, OFFERS, CART/BASKET
function getAllItems() {
    Object.keys(allProducts_Glob).forEach((key) => {
        Object.keys(allProducts_Glob[key]).forEach((subKey) => {
            let prObj = new ObjectProduct(allProducts_Glob[key][subKey]);
            if (key === 'slider') {
                jQuery("div#showlastoff").append(prObj.sliderListing());
            } else {
                jQuery("div#all" + key).append(prObj.productsListing());
                jQuery("table#allsearch").append(prObj.searchListing());
            }
        });
    });
}

// JQM Function to refresh the page
function refreshPage() {
    $.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        showLoadMsg: false,
        reloadPage: true
    });
}

// END RENDERING


// 7 - Active Functions In Pages

// 7 - 2 - Initiating Homepage Items' Slider
function slider() {
    //let interval = setInterval // on page switch, check if not homepage stop it, if not start it
    let curInd = 0,
        lastOff = jQuery("div#showlastoff div.scol"),
        sliderLen = lastOff.length;
    if (sliderLen > 1) {
        setInterval(function () {
            lastOff.hide();
            lastOff.eq(curInd).css('display', 'inline-block');
            if (curInd < sliderLen - 1) {
                curInd += 1;
            }
            else {
                curInd = 0;
            }
        }, 3500);
    }
}

// 8 - PAGE CONTROLS


//FINISH PAGE CONTROLS//


// 9 - Send order via Ajax After Click to the server
let erro = {},
    confirmSending;

jQuery(document).ready(function () {
    jQuery('button#ordernow').click(function () {
        let prods = [],
            items = {},
            totalPrice = 0;
        let getLocalItems = cartBasketInit.getFinalBasket();
        Object.keys(getLocalItems).forEach((k) => {
            let v = getLocalItems[k];
            // $.each(getLocalItems, function (k, v) {
            let item = getLocalItems[k];
            items[k] = item;
            totalPrice += Number(item.price) * Number(item.qtty);
            prods.push(item.name);
        });
        console.log(items, prods, totalPrice);
        (async () => {
            try {
                let Prod = {};
                const addNewOrder = await fetch("apiToken.php?reqo=addNewOrder", {
                    method: "POST",
                    //rewire prods and items
                    body: {token: localStorage.getItem('token'), products: prods, order: items, localTotal: totalPrice}
                });
                const jsonAp = await addNewOrder.json();
                const accSum = {};//await JSON.parse(jsonAp.userTransact);
                // if (error ){
                //     console.log(data.responseText);
                //     console.log("%c ERR", "color:red");
                // }
                await (() => {
                    Object.keys(accSum).forEach((key) => {
                        val = accSum[key];
                        accSum[val.id] = val;
                    });
                    localStorage.setItem("accSum", JSON.stringify(accSum));
                    accSumStrgF = JSON.parse(localStorage.getItem("accSum"));
                })();

            }
            catch (e) {
                console.log(e);
            }
        })();

        let erroArrPointer = 0;
        // let erroSendingArrPointer = 0;
        let status = true;//was "pass"
        //Check if GPS Coordinates are set, else ask for confirm sending without gps
        if (document.cookie.indexOf("gps") === -1 || $.cookie("gps").length < 8
            || localStorage.getItem("lat") === null || localStorage.getItem("lat").length < 4) {
            erroArrPointer += 1;
            erro["gps"] = "No GPS";
            confirmSending = confirm("Do you want to send the order without GPS");
        } else {
            confirmSending = confirm("Are you sure you want to send the order?");
            let gps = $.cookie("gps");
        }
        console.log(confirmSending);
        if (!confirmSending) {
            console.log("Order Stopped by user");
        } else {
            console.log("Check 2 After confirm is ok");
        }
        console.log("Order on its road..");

        function checkValidateStatus(a, b) {
            erroArrPointer += 1;
            status = false;
            erro[a] = b;
            console.log(status);
            console.log(erro);
            // console.log(erroArrPointer);
        }

        //rev
        if (document.cookie.indexOf("user") === -1) {
            checkValidateStatus("User", "User Cookie Mobile Doesnt Exist");
        } else if (document.cookie.indexOf("logged") === -1) {
            checkValidateStatus("Logged", "User Logged Cookie Doesnt Exist");
        } else {
            console.log("Check 3 user is ok");
            //Get All items as json object, or fail
            //rechecking for all Cart Items from HTML5 Storage
            checkLsForCartItems();
            let itemsJsonObj = {};
            //if no item fail, else if an item or more exists will add them into a json object to send later via ajax to insert into DB
            if (getLocalItems.length === 0) {
                checkValidateStatus("Cart", "No items in Cart");
            } else {
                Object.keys(getLocalItems).forEach((k) => {
                    let v = getLocalItems[k];
                    // $.each(getLocalItems, function (k, v) {
                    // let typo = localStorage.getItem("item" + v);
                    itemsJsonObj[k] = JSON.parse(localStorage.getItem("item" + v));
                    itemsJsonObj[k][0].totalPrice = Number(itemsJsonObj[k][0].price) * Number(itemsJsonObj[k][0].qtty);
                });
                console.log(itemsJsonObj);
                console.log("Check 6 pack all existing items and their details into 1 object to send later via ajax to the DB");
            }
            /* Making Ajax Call to do the order */

            // let ajaxRepeatSendingI = 0;

            function ajaxSendingCommand() {
                (async () => {
                    try {
                        let Prod = {};
                        const getSendingResponse = await fetch("apiToken.php?reqo=newAjaxCommandSend", {
                            method: "POST",
                            body: {token: localStorage.getItem('token'), itemsInCart: itemsJsonObj}
                        });
                        const jsonAp = await getSendingResponse.json();
                        const responseJSON = await JSON.parse(jsonAp.sentResponse);


                        console.log(responseJSON);
                        //Session Response, Check if PHP User session Exist
                        if (responseJSON.session === null) {
                            checkValidateStatus("Session", "No Existing Php User Session");
                        }
                        else {
                            console.log("Check 4.1 Session in php is ok");
                        }
                        //Cookie vs Session Matching, compare php user Session to local coockie
                        if ($.cookie("user") !== responseJSON.usrSession) {
                            checkValidateStatus("UsrSession", "User Cookie Mismatching Php User Session");
                        } else {
                            console.log("Check 4.2 Users Matches browser and in php is ok");
                        }
                        //End Session Response and user session matching

                        //Get Order ID Response
                        if (responseJSON.orderId === null) {
                            checkValidateStatus("orderID", "Error with Order ID Null");
                        } else {
                            console.log("Check 5.1 Getting and inserting a new Order ID into and from the database then into Coockie");
                        }
                        //End Order ID Response

                        //Inserting into Database
                        if (responseJSON.dbStored === null) {
                            checkValidateStatus("dbStored", "Error Storing Command Into Database");
                        } else {
                            console.log("Check 7 Items Added to Database after sending to PHP Parse, then add to userorder table in db for each item");
                        }
                        //End Inserting into Database

                        //Sending Email
                        if (responseJSON.sendingEmail === null) {
                            checkValidateStatus("sendingEmail", "Error Sending Command Per Email");
                        } else {
                            console.log("Check 8 Items Sent By Email");
                        }
                        //End Sending Email
                    }
                    catch (e) {
                        console.log(`Error ${e}`);
                    }
                })();
            }

            ajaxSendingCommand();
            //Show an alert if failed to post to Database or Sending Via Email
            if (!status) {
                function forErr() {
                    let gf;
                    gf = '';
                    for (let i = 0; i < erroArrPointer; i++) {
                        gf = gf + Number(i + 1) + "- " + erro[Object.keys(erro)[i]] + " \n ";
                    }
                    alert(`Errors From App : \n ${gf}`);
                }

                forErr();
            }
            //Removing Locally Stored Data After Sending is successful
            if (status) {
                // ajaxSendingCommand();
                // $.each(getLocalItems, function (k, v) {
                Object.keys(getLocalItems).forEach((k) => {
                    let v = getLocalItems[k];
                    localStorage.removeItem("item" + v);
                    jQuery("div#mybasket .item-id-" + v).remove();
                });
                cartBasketInit.resetCart();
                alert("Order Has Been Sent Successfuly!\nOur Sales Will Contact You Soon.");
                window.location.href = "/index.html";
            }
            //End Removing Locally Stored Datas After Sending is successful
        }
    });
});