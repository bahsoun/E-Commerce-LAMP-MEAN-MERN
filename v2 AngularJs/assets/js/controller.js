/**
 * Created by new on 11/6/16.
 */


//Control Route App
commoAppRoute.controller('AppRoutingController',
    ['$scope','$http','$routeParams',
        function($scope,$http,$routeParams){
            $scope.appName="themar-tayeba.com";
        }
    ]
).controller('EntranceController',//Control Entrance Page
    ['$scope','$http','$cookies','$location','$routeParams',
        function($scope,$http,$cookies,$location,$routeParams){
            if ($cookies.get('userA') ==undefined
                || $cookies.get('userA') == null
                || $cookies.get('userA').length < 5
            ){
                $location.url('/login');
            }else  if($cookies.get('userA') !==undefined
                && $cookies.get('userA') !== null
                && $cookies.get('userA').length > 5
            ){
                $location.url('/eindex');
            }
        }
    ]
);


//Control ecommerce pages
commoApp.controller('EcommoController',
    ['$scope','$http','$cookies','$location','$routeParams','ls','Page',
        function($scope,$http,$cookies,$location,$routeParams,ls,Page){
            if ($cookies.get('userA') ==undefined
                || $cookies.get('userA') == null
                || $cookies.get('userA').length < 5
            ){$location.url('/login');}
            $scope.opM=function(){$scope.showMenu=true;}
            $scope.go = function(location){$location.url(location);};
            $scope.detail = function(location){$location.url('/cm/'+location);};

            /*
            //Update only if data from server is changed
            //Update only the changed data
            //Also add a listener to get notified from the server
            var getIfUpd=false;
            getIfUpd = function(){
            };
            //get data from server //To be moved to login
            //if data on server is updated, the localdata will be refreshed

             if (getIfUpd() || ls.g('doto') == null){
                (function(){
                    return $http.get("js/data.json").
                    success(function(dat){
                    })
                })();
             }*/
                (function(){
                    return $http.get("./assets/js/data.json").
                    success(function(dat){
                        ls.s('doto',JSON.stringify(dat));
                    })
                        ;
                }());

            $scope.exto=JSON.parse(ls.g('doto'));
            $scope.cartItemsLs = JSON.parse(ls.g('cartItems')) ? JSON.parse(ls.g('cartItems')) : {};

            //extract categories
            $scope.catArray={};
            var alli=0;
            for (i in $scope.exto.Prod){
                if(i != 'slider'){$scope.catArray[alli]=i;}
                alli++;
            }
            ls.s('catos',JSON.stringify($scope.catArray));
            $scope.catos=JSON.parse(ls.g('catos'));
            (function(){return $http.get("./assets/js/usrPref.json").success(function(dat){ls.s("usrPref",JSON.stringify(dat))})}());
            $scope.usrPref=JSON.parse(ls.g("usrPref"));

            var prodCat = $routeParams.prodCat;
            $scope.prodCtg=prodCat;
            $scope.prodCatg=$scope.exto.Prod[prodCat];

            var cmdId = $routeParams.cmdId;
            $scope.cmdIdDetail=$scope.exto.accDet[cmdId];

            $scope.itmRemoveOne=function(id,type,price){
                var qty,cartItemsNew={},
                    cartItems = JSON.parse(ls.g('cartItems')) ? JSON.parse(ls.g('cartItems')) : {};

                if(!cartItems['total']){cartItems['total']=0;}
                if (cartItems[id] != undefined){qty = cartItems[id].qty;}else{qty = 0;}

                if (qty == 1){
                    qty=0;
                    cartItems['total']=Number(cartItems['total'])-Number(price);
                }else if(qty > 1){
                    qty=cartItems[id].qty -1;
                    cartItems['total']=Number(cartItems['total'])-Number(price);
                }

                cartItems[id]={"qty":qty,"t":type,"p":Number(price)};
                for (var i in cartItems){if (cartItems[i].qty > 0 ){cartItemsNew[i]=cartItems[i];}}
                cartItemsNew['total']=cartItems['total'];
                $scope.cartItemsLs = cartItemsNew;
                ls.s('cartItems',JSON.stringify(cartItemsNew));
            };

            $scope.itmAddOne=function(id,type,price){
                // var oldData = JSON.parse(ls.g('doto'));
                var cartItems = JSON.parse(ls.g('cartItems')) ? JSON.parse(ls.g('cartItems')) : {};
                var qty=Number((cartItems[id] ? cartItems[id].qty : 0) +1);
                cartItems[id]={"qty":qty,"t":type,"p":Number(price)};
                if(!cartItems['total']){cartItems['total']=0;}
                cartItems['total']=Number(Number(cartItems['total'])+Number(price));
                $scope.cartItemsLs = cartItems;
                ls.s('cartItems',JSON.stringify(cartItems));
            };


        }
    ]
).controller('EcommoLoggiController',//Control Login Pages
    ['$scope','$http','$cookies','$location','$routeParams','ls','$window',
        function($scope,$http,$cookies,$location,$routeParams,ls,$window){
            if ($cookies.get('userA') !==undefined
                && $cookies.get('userA') !== null
                && $cookies.get('userA').length > 5
            ){
                $location.url('/eindex');
            }
            getJson = function(){
                return $http.get("./assets/js/data.json").
                    success(function(dat){
                        ls.s('doto',JSON.stringify(dat));
                    })
                ;
            };
            $scope.mob= '4086413242';
            $scope.verifMob= function(){
                var i = 0;
                if ( $scope.mobili == $scope.mob ){
                    $cookies.put('userA',$scope.mob);
                    getJson();
                    $location.url('/eindex');
                }else{
                    i++;
                    $cookies.put('userERR',i);
                    $cookies.put('userERRN',$cookies.get('userERRN')+','+$scope.mobili);
                }
            };
        }
    ]
).controller('EcommoReggiController',//Control Reg Pages
    ['$scope','$http','$cookies','$location','$routeParams',
        function($scope,$http,$cookies, $location,$routeParams){

            $scope.reggiNoew = function(){

            };


            if ($cookies.get('userA') !==undefined
                && $cookies.get('userA') !== null
                && $cookies.get('userA').length > 5
            ){$location.url('/eindex');}

        }
    ]
).controller('EcomBasketController',
['$scope','ls',
    function($scope,ls){
    // console.log(ls.g('basketr'));
        console.log(Object.keys(ls.g('cartItems')).length);
        !ls.g('cartItems') || Object.keys(ls.g('cartItems')).length <=14 ? $scope.basketEmpty=true : '';
}]);