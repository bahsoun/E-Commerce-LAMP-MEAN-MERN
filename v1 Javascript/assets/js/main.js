//ES5 Version

//Clear Storage on new logic

// 1 - Vars declarations
let user,
    usrInf = {},
    accSum = {},
    accDet = {},
    Prod = {},
    usrInfStrgF,
    accSumStrgF,
    accDetStrgF,
    allProducts_Glob,
    totalprice = 0;
//END Vars declarations

// 2 - START CLASSES DECLARATIONS

// 2 - 1 - START PRODUCTS CLASS PROPERTIES AND METHODS
function ObjectProduct(objID) {
    // console.log(objID);
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
    let iClasses = ' AddOrSub ui-btn ui-corner-all ui-btn-icon-notext ui-icon-';
    this.productsListing = function () {
        return "<div " +
            "class='div-item-id item-id-" + this.id + " ui-block-b' " +
            "item-id-attr='" + this.id + "' " +
            "item-price-attr='" + this.price + "' " +
            "item-catg-attr='" + this.type + "' " +
            "item-cart-attr='" + this.cartQty +
            "'>" +
            "<div class='imgf'>" + "\n" +
            "<img src='" + this.base + this.img + "'/>" + "\n" +
            "</div><br>" +
            "<h4>" + this.name + "</h4>" + "\n" +
            "<i class='itmAddOne add" + this.id + iClasses + "plus'>+</i>" + "\n" +
            "<p class='ppp count" + this.id + "'>" + this.cartQty + "</p>" + "\n" +
            "<i class='itmRemoveOne minus" + this.id + iClasses + "minus'>-</i>" + "\n" +
            "<p class='price'><b> $" + this.price + "</b>/" + this.qttTyp + "</p>" + "\n" +
            "</div>" + "\n";
    };

    this.sliderListing = function () {
        return "<div class=scol>" +
                    "<img src='" + this.base + this.img + "'/>" +
                    "<div class='aside'>" +
                        "<div class='itemName'>" + this.name + "</div>" +
                        "<div class='itemQttCtrl div-item-id item-id-" + this.id + "' " +
                        "item-id-attr='" + this.id + "' " +
                        "item-price-attr='" + this.price + "' " +
                        "item-catg-attr='" + this.type + "' " +
                        "item-cart-attr='" + this.cartQty +
                        "'>" +
                            "<i class='itmAddOne add" + this.id + iClasses + "plus'>+</i>" + "\n" +
                            "<p class='ppp count" + this.id + "'>" + this.cartQty + "</p>" + "\n" +
                            "<i class='itmRemoveOne minus" + this.id + iClasses + "minus'>-</i>" + "\n" +
                        "</div>" +
                        "<div class='itemPrice'><b>$" + this.price + "<b></div>" +
                    "</div>" +
                "</div>";
    };

    this.searchListing = function () {
        return "<tr><td><div " + "\n" +
            "class='div-item-id item-id-" + this.id + " ui-block-b' " +
            "item-id-attr='" + this.id + "' " +
            "item-price-attr='" + this.price + "' " +
            "item-catg-attr='" + this.type + "' " +
            "item-cart-attr='" + this.cartQty + "' " +
            "style='width:100% !important;'" +
            ">" + "\n" +
            "<div class='imgf'><img src='" + this.base + this.img + "' /></div>" + "\n" +
            "<br><h4>" + this.name + "</h4>" + "\n" +
            "<i class='itmAddOne add" + this.id + iClasses + "plus'>-</i>" + "\n" +
            "<p class='ppp count" + this.id + "'>" + this.cartQty + "</p>" + "\n" +
            "<i class='itmRemoveOne minus" + this.id + iClasses + "minus'>-</i>" + "\n" +
            // "<p style='padding:0;margin:0;'>" + this.cat + "</p>" + "\n" +
            "<p><b><b> $" + this.price + "</b>/" + this.type + "<b></p>" + "\n" +
            "</div></td></tr>" + "\n";
    };


}

// END PRODUCTS CLASS PROPERTIES AND METHODS


// 2 - 2 - START CART CLASS PROPERTIES AND METHODS

function CartBasket() {

    let cart = {cartTotal: 0, items: {}};

    this.init = function () {
        this.initUpdtCart();
        this.getCartItems();
    };

    this.initUpdtCart = function () {
        if (JSON.parse(localStorage.getItem('cart')) !== null) {
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            this.saveCart();
        }
    };

    this.saveCart = function () {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    this.sync = function () {
        //Sync between browser pages, could also sync over multiple devices,
        // but making multiple buying baskets/carts that customer can choose from or resume
        // synced via db or websocket
        //Update : item (attr, text), basket (div),let cart(items[id]),LS(from cart)
        this.initUpdtCart();
        this.calcCartTotal();

        if (Object.keys(cart.items).length > 0) {
            $.each(cart.items, function (itemId, item) {

                //If Item exists don't append again
                if (jQuery("div#mybasket .item-id-" + itemId).length === 0) {
                    // console.log(jQuery("div#mybasket .item-id-" + itemId).text());
                    jQuery("div#mybasket").append((new ObjectProduct(item)).productsListing());
                }

                //Update/sync the qty if >= 1, Used for syncing if qty modified from other page tab,
                // to same element existing in category/listing, cart/basket, & also search
                jQuery(".count" + itemId).text(item.qtty).parents(".item-id-" + itemId).attr("item-cart-attr", item.qtty);

                //Update/sync the qty if = 0, Check available items in the cart/basket page in html,
                //And compare to cart LS, then remove the items that aren't anymore
                $.each(jQuery("div#mybasket .div-item-id"), function (k, v) {
                    let itemId = jQuery(this).attr("item-id-attr");
                    if (cart.items[itemId] === undefined
                        || cart.items[itemId] === null) {
                        jQuery("div#mybasket .item-id-" + itemId).remove();
                        jQuery(".count" + itemId).text(0).parents(".item-id-" + itemId).attr("item-cart-attr", 0);
                    }
                });

            });
        } else {
            //Used for sync, remove all items if no items inside cart LS
            jQuery("div.div-item-id p.ppp").text(0);
            jQuery("div.div-item-id").attr("item-cart-attr", 0);
            jQuery("div#mybasket .div-item-id").remove();
        }

        //set Total even if 0, used for init
        jQuery('h4#allprice').text("$" + cart.cartTotal);
        this.chkBasktEmpty();
        this.getCartItems();
    };

    this.getQtt = function (itemId) {
        // console.log(cart,itemId);
        if (Object.keys(cart.items).length > 0 && cart.items[itemId] !== null && cart.items[itemId] !== undefined) {
            return Number(cart.items[itemId].qtty);
        } else {
            return 0;
        }
    };

    this.getCartItems = function () {
        this.calcCartTotal();
        if (Object.keys(cart.items).length > 0) {
            $.each(cart.items, function (itemId, item) {
                //If Item exists don't append again
                if (jQuery("div#mybasket .item-id-" + itemId).length === 0) {
                    jQuery("div#mybasket").append((new ObjectProduct(item)).productsListing());
                }

                //Update/sync the qty, Used for syncing if qty modified from other page tab,
                // to same element existing in category/listing, cart/basket, & also search
                jQuery(".count" + itemId).text(item.qtty).parents(".item-id-" + itemId).attr("item-cart-attr", item.qtty);
            });
        }

        //set Total even if 0, used for init
        jQuery('h4#allprice').text("$" + cart.cartTotal);
        this.chkBasktEmpty();
    };

    this.calcCartTotal = function () {
        let cartTotal = 0;
        if (Object.keys(cart.items).length !== 0) {
            $.each(cart.items, function (itemId, item) {
                cartTotal += item.qtty * item.price;
            });
        }
        if (cartTotal !== cart.cartTotal) {
            console.warn("ERROR : Total Calc Mismatch " +
                "\n Real Cart Total " + cartTotal +
                "\n Modified Cart Total " + cart.cartTotal +
                "\nSetting the real Total to " + cartTotal + "!"
            );
            cart.cartTotal = cartTotal;
            jQuery('h4#allprice').text("$" + cartTotal);
        }
        this.saveCart();
    };

    this.chkBasktEmpty = function () {
        if (Object.keys(cart.items).length === 0) {
            jQuery("div#basket").addClass("empty");
        } else {
            jQuery("div#basket").removeClass("empty");
        }
    };

    this.addSubItem = function (item, operation) {
        let id = item.id,
            itmCartQty = this.getQtt(id),
            cartTotal = cart.cartTotal;

        //Add / Sub operation
        if (operation === "add") {
            ++itmCartQty;
            cartTotal = Number(cartTotal) + Number(item.price);
        } else if (operation === "sub" && itmCartQty > 0) {
            --itmCartQty;
            cartTotal = Number(cartTotal) - Number(item.price);
            if (itmCartQty < 1) {
                delete cart.items[id];
                jQuery("div#mybasket .item-id-" + id).remove();
            }
        }

        //If Item qty > 1 add to cart obj & save to LS,
        if (itmCartQty > 0) {
            cart.items[id] = {
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
                jQuery("div#mybasket").append((new ObjectProduct(cart.items[id])).productsListing());
            }
        }

        //Update Qty on item (text & attribute) in both pages : basket & category listing
        jQuery(".count" + id).text(itmCartQty).parents(".item-id-" + id).attr("item-cart-attr", itmCartQty);

        //Set Total Price
        jQuery('h4#allprice').text("$" + cartTotal);
        cart.cartTotal = cartTotal;

        //Save to Localstorage & Check if cart/basket is empty or not to show/hide related divs
        this.saveCart();
        this.chkBasktEmpty();
    };


    this.resetCart = function () {
        cart = {cartTotal: 0, items: {}};
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

    //Rendering to html
    getAllItems();

    //init slider
    slider();

    //If logged in (token exists),
    // Sending AJAX to Request User info & account,
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

    // console.log(thisItemId, thisItem, thisType, jQuery(this).parents(".div-item-id").attr("item-id-attr"));
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
        if (!$(e.target).hasClass("search")){
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
    $.ajax("./apiToken.php?reqo=GetUserInfo",
        // OLD METHOD USED
        // $.ajax("../app/php/usrinfo.php",
        {
            type: "POST", async: false,
            dataType: "json",
            data: {token: localStorage.getItem('token')},
            success: function (data) {
                if (data.Error === "Token Mismatch") {
                    window.location.href = "./login.html";
                } else {
                    $.each(JSON.parse(data.userInfo), function (key, val) {
                        usrInf[key] = val;
                    });
                    localStorage.setItem("usrInfF", JSON.stringify(usrInf));
                    usrInfStrgF = JSON.parse(localStorage.getItem("usrInfF"));

                    //Assign to HTML the Values of user info if logged
                    let city = jQuery("<h4>" + usrInfStrgF.current + "</h4>"),
                        ids = ["uname", "uphone", "uwhatsapp", "uadd1", "uadd2"],
                        vals = ["name", "phone", "whatsapp", "address", "current"];

                    jQuery("select#city").append(city);
                    jQuery("h3#userid").text(usrInfStrgF.name);

                    $.each(ids, function (k, v) {
                        //check if all are inputs
                        jQuery("input#" + v).val(usrInfStrgF[vals[k]]);
                    });

                    //Logic to be modified later
                    if (data !== '') {
                        jQuery('.notlog').hide();
                        jQuery('.log').show();
                    }
                }
            }, error: function (data) {
                console.log(data.responseText);
            }
        });
});

// 5 - 1 - 2 - GET USER ACC HISTORY & ACCOUNT DETAILS
let usrAcc = (function () {
    $.ajax("./apiToken.php?reqo=GetUserTransSum",
        {
            type: "POST", async: false,
            dataType: "json",
            data: {token: localStorage.getItem('token')},
            success: function (data) {
                $.each(JSON.parse(data.userTransact), function (key, val) {
                    accSum[val.id] = val;
                });
                localStorage.setItem("accSum", JSON.stringify(accSum));
                accSumStrgF = JSON.parse(localStorage.getItem("accSum"));
            },
            error: function (data) {
                console.log("%c ERR", "color:red");
            }
        });

    //Account History Details
    $.ajax("./apiToken.php?reqo=GetUserTransactDet",
        // OLD METHOD USED
        // $.ajax("../app/php/getAccDet.php",
        {
            type: "POST", async: false,
            dataType: "json",
            data: {token: localStorage.getItem('token')},
            success: function (data) {
                $.each(JSON.parse(data.userTransact), function (key, val) {
                    accDet[key] = val;
                });
                localStorage.setItem("accDet", JSON.stringify(accDet));
                accDetStrgF = JSON.parse(localStorage.getItem("accDet"));
                
                //Assign to HTML Values Of Account History for this user
                let idb;
                jQuery("div#myaccount table").append("<tr><td style='width: 25px;'> Num  </td><td style='    width: 61px;'>Total </td><td style='    width: 166px;'>Date</td></tr>");
                $.each(accSumStrgF, function (k) {
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
                    $.each(accDetStrgF[idbd], function (keyy, vall) {
                        let oo = jQuery("<tr><td>" + vall.product + "</td><td> " + vall.quantity + " </td> <td>" + vall.price + " $ </td></tr>");
                        jQuery("div#thisorderinfo table").append(oo);
                        thisorderprice += Number(vall.price * vall.quantity);
                    });
                    jQuery(jqTbl).append("<tr><td colspan=3><b>Total <b> " + accSumStrgF[idbd]['tp'] + " $ </td></tr>");
                    // jQuery(jqTbl).append("<tr><td colspan=3><b>Total <b> " + thisorderprice + " $ </td></tr>");
                    jQuery("div#thisorderinfo").append("<div class=history><a href='javascript: window.history.back();'> Go Back</a></div>");
                    $.mobile.changePage("div#thisorder");
                });
            },
            error: function (data) {
//                console.log(data);
                console.error("ERR : " + data.responseText + " | ");
            }
        });
});

// 5 - 1 - 3 - edit, update user info
jQuery(document).ready(function () {
    jQuery('input#updateaccount').click(function () {
        let data = jQuery("form#updateinfo").serialize();
        data += "&token=" + localStorage.getItem('token');
        $.ajax("./apiToken.php?reqo=UpdtUsrInf", {
            type: "POST", data: data, success: function (data) {
//                console.log(data);
            }, error: function (data) {
                console.log(data.responseText);
            }
        })
    });
});

// 5 - 2 - Get All classes Grouped as Objects by Categories also slider and offer
let getProd = function () {
    $.ajax("apiToken.php?reqo=getProducts",
        // OLD METHOD USED
        // $.ajax("../app/php/getProd.php",
        {
            type: "POST", async: false,
            dataType: "json",
            success: function (data) {
                $.each(JSON.parse(data.products), function (key, val) {
                    Prod[key] = val;
                });
                localStorage.setItem("Prod", JSON.stringify(Prod));
                allProducts_Glob = JSON.parse(localStorage.getItem("Prod"));
            },
            error: function (data) {
            }
        });
};

//END AJAX REQUESTS


// 6 - RENDERING Functions

// 6 - 1 - PRODUCTS INTO HTML FROM LOCAL OBJECTS
// 6 - 1 - CREATING PRODUCTS : CATEGORIES, SLIDER, OFFERS, CART/BASKET
function getAllItems() {
    $.each(allProducts_Glob, function (k, v) {
        $.each(allProducts_Glob[k], function (kk, ky) {
            let prObj = new ObjectProduct(allProducts_Glob[k][kk]);
            if (k === 'slider') {
                jQuery("div#showlastoff").append(prObj.sliderListing());
            } else {
                jQuery("div#all" + k).append(prObj.productsListing());
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
            items = {};
        $.each(getLocalItems, function (k, v) {
            let item = localStorage.getItem("item" + v);
            items[k] = JSON.parse(item);
            items[k][0].totalPrice = Number(items[k][0].price) * Number(items[k][0].qtty);
            prods.push(items[k][0].name);
        });
        console.log(items);
        $.ajax("./apiToken.php?reqo=addNewOrder", {
            type: "POST", async: false,
            dataType: "json",
            data: {token: localStorage.getItem('token'), products: prods, order: items},
            success: function (data) {
                $.each(JSON.parse(data.userTransact), function (key, val) {
                    accSum[val.id] = val;
                });
                localStorage.setItem("accSum", JSON.stringify(accSum));
                accSumStrgF = JSON.parse(localStorage.getItem("accSum"));
            },
            error: function (data) {
//                console.log(data);
                console.log(data.responseText);
                console.log("%c ERR", "color:red");
            }
        });

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
            console.log(erroArrPointer);
        }

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
                $.each(getLocalItems, function (k, v) {
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
                $.ajax("../app/php/newAjaxCommandSend.php", {
                    type: 'POST',
                    data: {itemsInCart: itemsJsonObj},
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        console.log(data);
                        //Session Response, Check if PHP User session Exist
                        if (data.session === null) {
                            checkValidateStatus("Session", "No Existing Php User Session");
                        }
                        else {
                            console.log("Check 4.1 Session in php is ok");
                        }
                        //Cookie vs Session Matching, compare php user Session to local coockie
                        if ($.cookie("user") !== data.usrSession) {
                            checkValidateStatus("UsrSession", "User Cookie Mismatching Php User Session");
                        } else {
                            console.log("Check 4.2 Users Matches browser and in php is ok");
                        }
                        //End Session Response and user session matching

                        //Get Order ID Response
                        if (data.orderId === null) {
                            checkValidateStatus("orderID", "Error with Order ID Null");
                        } else {
                            console.log("Check 5.1 Getting and inserting a new Order ID into and from the database then into Coockie");
                        }
                        //End Order ID Response

                        //Inserting into Database
                        if (data.dbStored === null) {
                            checkValidateStatus("dbStored", "Error Storing Command Into Database");
                        } else {
                            console.log("Check 7 Items Added to Database after sending to PHP Parse, then add to userorder table in db for each item");
                        }
                        //End Inserting into Database

                        //Sending Email
                        if (data.sendingEmail === null) {
                            checkValidateStatus("sendingEmail", "Error Sending Command Per Email");
                        } else {
                            console.log("Check 8 Items Sent By Email");
                        }
                        //End Sending Email
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
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
                    alert("Errors From App : \n " + gf);
                }

                forErr();
            }
            //Removing Locally Stored Data After Sending is successful
            if (status) {
                // ajaxSendingCommand();
                $.each(getLocalItems, function (k, v) {
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