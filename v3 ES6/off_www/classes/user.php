<?php
/**
 * Created by PhpStorm.
 * User: yahya
 * Date: 10/27/18
 * Time: 5:13 PM
 */


require_once ("database.php");
require_once ("token.php");

class user
{
    public function __construct() {


    }

    public static function getInfo($userPhone,$usrToken){
        $tk=new Token();
        $tkVerify=$tk->verifyToken($userPhone,$usrToken);
        $db=new Database();
        $pdo = $db->dbConnect();

        //may do an associative array with
        //multiple tokens and multiple userAgentInfo
        //so to verify if the token corresponds to the same userAgent/browser
        //[
        //   ["Mozilla/4.8 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/875.89 (KHTML, like Gecko) Chrome/61.0.3799.99 Safari/782.86",
        //    "F34f4g2#F$%#$F%#$@TFR$F%G534twdFSDAOF$REFADSLFORO"],
        //   ["userAgent","tokenMd5"]
        //]
        // Also verify with both js navigator.userAgent & php $_SERVER['HTTP_USER_AGENT']
        $statement = $pdo->prepare("
            SELECT usr_names.id, usr_names.name, usr_names.phone, usr_names.email, usr_names.whatsapp,
                  usr_names.address, usr_names.gps
            FROM usr_names 
            WHERE usr_names.phone = `$userPhone`
        ");
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        return $json;
    }
}