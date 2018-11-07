/**
 * Created by new on 11/6/16.
 */

//factory for app, Localstorage
commoApp.factory('ls',function($window,$rootScope){
    return{
        s:function(name,val){
            $window.localStorage && $window.localStorage.setItem(name,val);
            return this;
        },
        g:function(name){
            if ($window.localStorage.getItem(name) != undefined){
            return  $window.localStorage && $window.localStorage.getItem(name);
            }else{
                return false;
            }
        }
    };
}).factory('Page', function($window) {
    return {
        t:function(ttl){
            return $window.document.title= ttl;
        }
    };
}).factory('log', function() {return {l:function(log){console.log(log);}};

});
