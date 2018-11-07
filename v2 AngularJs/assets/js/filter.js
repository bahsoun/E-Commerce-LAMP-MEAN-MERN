/**
 * Created by new on 11/13/16.
 */

commoApp.filter('num', function() {
    return function(input) {
        return parseInt(input, 10);
    };
});