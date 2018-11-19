<?php
/**
 * Created by PhpStorm.
 * User: yahya
 * Date: 10/26/18
 * Time: 8:19 PM
 */
require_once ("database.php");

class products
{
    public function __construct() {


    }

    public static function getProducts(){
        $db=new Database();
        $pdo = $db->dbConnect();
        $statement = $pdo->prepare("
            SELECT products.id, products.name, products.cssClass, products.price, products.img,
                  products.offer, products.slider, 
                  categ.type, 
                  qtt_types.type as qttTyp
                  FROM products 
                    INNER JOIN categ ON products.catId = categ.id 
                    INNER JOIN qtt_types ON products.qttTypeId = qtt_types.id
        ");
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $arr=[];
        foreach ($results as $item){
            if ($item["slider"]){
                $arr["slider"][$item["id"]]=$item;
            }
            if ($item["offer"]){
                $arr["offers"][$item["id"]]=$item;
            }else{
                $arr[$item["type"]][$item["id"]]=$item;
            }
        }

        $json = json_encode($arr);
        return $json;
    }
}