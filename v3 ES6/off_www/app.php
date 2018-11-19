<?php
/**
 * Created by PhpStorm.
 * User: yahya
 * Date: 10/21/18
 * Time: 2:27 PM
 */
require_once("classes/products.php");
require_once("classes/user.php");

$srr =[];
if ($_REQUEST && isset($_REQUEST["reqo"]) && strlen($_REQUEST["reqo"]) < 25){
    $safeRequest = htmlentities($_REQUEST["reqo"], ENT_QUOTES, 'UTF-8');
    $ifChecksArr=[
        ["userPhone",]
    ];
    switch ($safeRequest){
        case "getProducts": $arr['products'] = products::getProducts();
                            break;
        case "userInfo": if ($_POST && isset($_POST["userPhone"]) && isset($_POST["userToken"])){
                            $userPhone = htmlentities($_POST["userPhone"]);
                            $usrToken =  htmlentities($_POST["userToken"]);
                                if (strlen($userPhone)  > 8 && strlen($userPhone) < 15 && strlen($usrToken) == 618 ){
                                    session_start();
                                    $arr['userInfo'] = user::getInfo($userPhone,$usrToken);
                                }else{
                                    $arr['errorSent']="fake";
                                    unset($_SESSION);
                                    session_destroy();
                                }
                        }
                            break;
        case "updateUserInfo":
            if ($_POST && isset($_POST["userPhone"]) && isset($_POST["userToken"])){
                $userPhone = htmlentities($_POST["userPhone"]);
                $usrToken =  htmlentities($_POST["userToken"]);
                if (strlen($userPhone)  > 8 && strlen($userPhone) < 15 && strlen($usrToken) == 618){
//                    $arr['update'] = user::updtInfo();
                }
            }
                            break;
        default: $arr["Error"]="No Data";
    }
}

echo json_encode($arr);