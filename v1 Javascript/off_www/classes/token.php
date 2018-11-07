<?php
/**
 * Created by PhpStorm.
 * User: yahya
 * Date: 10/27/18
 * Time: 5:21 PM
 */

require_once ("database.php");

class token
{


    public function __construct() {


    }

    public function verifyToken($userPhone,$usrToken){
        $db=new Database();
        $pdo = $db->dbConnect();
        $statement = $pdo->prepare("
            SELECT usr_names.phpLastToken 
            FROM usr_names 
            WHERE usr_names.phone = `$userPhone`
        ");
        $statement->execute();
        $dbUserToken = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (md5($usrToken) == $dbUserToken &&
            md5($usrToken) == $_SESSION["thisUserToken"] &&
            $userPhone == $_SESSION["thisUserPhone"] ){
            return true;
        }
        return false;
    }

    public function createToken($userPhone){

    }

    public function refreshTokenWeek($userPhone){

    }
}