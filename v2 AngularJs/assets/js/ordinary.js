/**
 * Created by new on 11/6/16.
 */

$(document).ready(function() {

    var curInd = 0;
    var sliderLen = $("#showlastoff div").length;
    setInterval(function () {
        //console.log(curInd);
        $("#showlastoff div").hide();
        $("#showlastoff div").eq(curInd).css('display', 'inline-block');
        if (curInd < sliderLen - 1) {
            curInd += 1;
        }
        else {
            curInd = 0;
        }
    }, 6000);

});