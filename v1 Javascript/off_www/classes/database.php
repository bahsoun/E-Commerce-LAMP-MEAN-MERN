<?php
/**
 * Created by PhpStorm.
 * User: yahya
 * Date: 10/26/18
 * Time: 7:19 AM
 */
//USE PDO;

class Database
{
    private $userDatabase;
    private $dbUser;
    private $dbPass;
    private $dbHost;

    public function __construct(){
        $this->userDatabase="432if_ecom_user";
        $this->dbUser="root";
        $this->dbPass="mysql";
        $this->dbHost="localhost";
    }

    public function dbConnect(){
        try{
        return new PDO("mysql:dbname=".$this->userDatabase.";host=".$this->dbHost, $this->dbUser,$this->dbPass);
        }
        catch (PDOException $err){
            die($err->getMessage()." | ".$err->getCode());
        }
    }

    private function tblInstall(){
        try {
            $this->dbConnect()->exec("
                CREATE TABLE IF NOT EXISTS categ (
                    id INT(11) UNSIGNED AUTO_INCREMENT,
                    type VARCHAR(50) NOT NULL,
                    PRIMARY KEY (id),
                    UNIQUE KEY (types)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
                
                CREATE TABLE IF NOT EXISTS qtt_types(
                    id INT(3) UNSIGNED AUTO_INCREMENT,
                    type VARCHAR(50) NOT NULL DEFAULT 'lb',
                    PRIMARY KEY (id),
                    UNIQUE KEY (types)
                )ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
                
                CREATE TABLE IF NOT EXISTS products (
                    id INT(11) UNSIGNED AUTO_INCREMENT,
                    name VARCHAR(255) UNIQUE NOT NULL,
                    price DOUBLE NOT NULL,
                    qtty INT DEFAULT 0,
                    img VARCHAR(255) NOT NULL,
                    catId INT UNSIGNED NOT NULL,
                    offer BOOLEAN NOT NULL DEFAULT 0,
                    slider BOOLEAN NOT NULL DEFAULT 0,
                    qttTypeId INT UNSIGNED NOT NULL,
                    PRIMARY KEY (id),
                    CONSTRAINT fk_catId FOREIGN KEY (catId)
                        REFERENCES categ(id),
                    CONSTRAINT fk_qttTypeId FOREIGN KEY (qttTypeId)
                        REFERENCES qtt_types(id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
                
                CREATE TABLE IF NOT EXISTS usr_names(
                  id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
                  phone varchar(21) NOT NULL,
                  name varchar(128) NOT NULL,
                  email varchar(128) DEFAULT NULL,
                  whatsapp varchar(21) NOT NULL,
                  address varchar(255) NOT NULL,
                  password varchar(255) NOT NULL,
                  curAddress varchar(32) NOT NULL,
                  gps varchar(40) NOT NULL,
                  pushToken varchar(255) DEFAULT NULL,
                  phpLastToken varchar(255) DEFAULT NULL,
                  PRIMARY KEY (phone),
                  UNIQUE KEY (id),
                  UNIQUE KEY (pushToken),
                  UNIQUE KEY (phpLastToken)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
                
                INSERT INTO usr_names (id, phone, name, email, whatsapp, address, password, curAddress, gps, pushToken, phpLastToken) VALUES
                (NULL,'540234222', 'Michel Lorem', NULL, '5402112220', 'Dallas', '264eab1c85925cd90734e59819014818', 'Dallas',  '', '1', '1'),
                (NULL,'541677543', 'Alice Ipsum', NULL, '0541677242', 'Austin', '81dc9bdb52d04dc20036dbd8313ed055', 'Austin',  '', '2', '2'),
                (NULL,'562668754', 'Yahya Bahsoun', NULL, '0562668875', 'Houston', '114ba2ba77b8aec539c3b081c4c8d998', 'Houston', '29.7228828,-95.4822501', '3', '3'),
                (NULL,'598078834', 'Fat00mi maytham akshakhs ', NULL, '0598078878', 'Austin', '114ba2ba77b8aec539c3b081c4c8d998', 'Austin',  '', '4', '4'),
                (NULL,'123456312', 'bahsoun', 'h@bahsoun.net', '123456', 'Austin', '202cb962ac59075b964b07152d234b70', 'Austin',  '', '5', '5'),
                (NULL,'704238953', 'yahya', NULL, '70423895', 'Houston', '9d25305725a1d48236e03a6ff69f7c38', 'Houston',  '', '6', '6');
                
                CREATE TABLE IF NOT EXISTS usersorder (
                  id int(11) NOT NULL,
                  product varchar(128)  NOT NULL,
                  mobile varchar(21)  NOT NULL,
                  datetime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                  quantity int(11) NOT NULL,
                  price double NOT NULL,
                  closed int(11) NOT NULL DEFAULT '0',
                  cat varchar(32)  NOT NULL,
                  PRIMARY KEY (id,product,mobile),
                  KEY product (product),
                  KEY mobile (mobile),
                  CONSTRAINT `usersorder_fk` FOREIGN KEY (`mobile`) REFERENCES `usr_names` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
                
                
                INSERT INTO categ (id, type) VALUES
                (1, 'fruits'),
                (2, 'veg'),
                (3, 'misc');
                
                /*ALTER TABLE qtt_types AUTO_INCREMENT=3;*/
                
                INSERT INTO qtt_types (id, type) VALUES 
                (NULL, 'lb'),
                (NULL, 'pc'),
                (NULL, 'crt');
                
                INSERT INTO products (id, name, cssClass, price, qtty, img, catId, offer, slider, qttTypeId) VALUES
                (NULL, 'Carrot', 'Carrot',5, 9, 'carrot-fb.jpg', '2', 0, 0, 1),
                (NULL, 'Apple', 'Apple',10, 6, 'apple.jpg', '1', 1, 1, 1),
                (NULL, 'Watermelon', 'Watermelon',25, 40, 'imag434253127410006.jpg', '1', 0, 0, 2),
                (NULL, 'Banana', 'Banana', 8, 40, 'imag434253127414235.jpg', '1', 0, 0, 1),
                (NULL, 'Green Orange', 'Green Orange', 15, 40, 'imag406648088374274.jpg', '1', 0, 1, 1),
                (NULL, 'Parsley', 'Parsley',1, 40, 'imag734114836701649.jpg', '2', 0, 0, 2),
                (NULL, 'Coriander', 'Coriander',1, 40, 'imag456179311111497.jpg', '2', 0, 0, 2),
                (NULL, 'Rocca', 'Rocca',1, 40, 'imag278675789734828.jpg', '2', 0, 0, 2),
                (NULL, 'Yellow lemon', 'Yellow lemon', 10, 40, 'imag39834956667356.jpg', '1', 0, 0, 1),
                (NULL, 'Leeks', 'Leeks',1, 40, 'imag481242034171718.jpg', '2', 0, 0, 2),
                (NULL, 'Grape', 'Grape',15, 40, 'imag134134390325951.jpg', '1', 0, 0, 1),
                (NULL, 'Purslane', 'Purslane',25, 40, 'imag693408792213722.jpg', '2', 0, 0, 2),
                (NULL, 'Mango Alfa', 'Mango Alfa', 30, 40, 'imag221133115083259.jpg', '1', 0, 0, 3),
                (NULL, 'Orange', 'Orange',30, 40, 'imag295524622086830.jpg', '1', 0, 0, 3),
                (NULL, 'Tomato', 'Tomato',12, 40, 'imag217145493105596.jpg', '2', 0, 0, 3),
                (NULL, 'Concumber', 'Concumber',10, 40, 'imag985254542451196.jpg', '2', 0, 0, 3),
                (NULL, 'Radish', 'Radish',1, 40, 'imag760107559857501.jpg', '2', 0, 0, 2),
                (NULL, 'Potato', 'Potato',6, 40, 'imag497230086512718.jpg', '2', 0, 0, 2),
                (NULL, 'Okra', 'Okra',12, 0, 'imag144075335393698.jpg', '2', 0, 0, 3),
                (NULL, 'Calabash', 'Calabash',5, 50, 'imag634208558493075.jpg', '2', 0, 0, 1),
                (NULL, 'Zucchini', 'Zucchini',15, 40, 'imag805082663157294.jpg', '2', 0, 0, 3),
                (NULL, 'Aubergine', 'Aubergine',8, 40, 'imag436512873140200.jpg', '2', 0, 0, 3),
                (NULL, 'Onion', 'Onion',6, 40, 'imag249813587223650.jpg', '2', 0, 0, 2),
                (NULL, 'Onion Green', 'Onion Green', 1, 40, 'imag545437212091016.jpg', '2', 0, 0, 2),
                (NULL, 'Salad', 'Salad',4, 40, 'imag963795492461765.jpg', '2', 0, 0, 2),
                (NULL, 'Melon', 'Melon',15, 40, 'imag283929416694561.jpg', '1', 0, 0, 3);


            "."
        
                INSERT INTO `usersorder` (`id`, `product`, `mobile`, `datetime`, `quantity`, `price`, `closed`, `cat`) VALUES
                (282, 'Qiwi', '562668754', '2016-05-18 16:00:28', 2, 4, 1, ''),
                (498, 'Potato', '540234222', '2016-04-29 23:53:59', 1, 10, 1, 'Carton'),
                (498, 'Salad', '540234222', '2016-04-29 23:53:59', 1, 1, 1, 'lb'),
                (498, 'Tomato', '540234222', '2016-04-29 23:53:58', 3, 6, 1, 'lb'),
                (498, 'Qiwi', '540234222', '2016-04-29 23:53:59', 2, 4, 1, 'lb'),
                (552, 'Potato', '562668754', '2016-05-21 16:38:32', 3, 30, 1, ''),
                (552, 'Carrot', '562668754', '2016-05-21 16:38:32', 2, 14, 1, ''),
                (552, 'Tomato', '562668754', '2016-05-21 16:38:32', 3, 6, 1, ''),
                (1026, 'Rocca', '562668754', '2016-06-04 17:09:05', 1, 1, 1, ''),
                (1026, 'Carrot', '562668754', '2016-06-04 17:09:05', 4, 28, 1, ''),
                (1026, 'Tomato', '562668754', '2016-06-04 17:09:05', 3, 6, 1, ''),
                (1061, 'Carrot', '562668754', '2016-05-07 18:55:37', 6, 42, 1, ''),
                (1061, 'Tomato', '562668754', '2016-05-07 18:55:37', 8, 16, 1, ''),
                (1203, 'Carrot', '704238953', '2016-06-11 21:47:11', 1, 7, 1, ''),
                (1203, 'Tomato', '704238953', '2016-06-11 21:47:11', 2, 4, 1, ''),
                (1203, 'Strawberry', '704238953', '2016-06-11 21:47:11', 1, 8, 1, ''),
                (1203, 'Qiwi', '704238953', '2016-06-11 21:47:11', 2, 4, 1, ''),
                (1216, 'Potato', '562668754', '2016-05-30 16:51:28', 6, 60, 1, ''),
                (1216, 'Carrot', '562668754', '2016-05-30 16:51:28', 7, 49, 1, ''),
                (1216, 'Tomato', '562668754', '2016-05-30 16:51:28', 4, 8, 1, ''),
                (1700, 'Potato', '562668754', '2016-05-14 18:17:33', 2, 20, 1, ''),
                (1700, 'Carrot', '562668754', '2016-05-14 18:17:32', 2, 14, 1, ''),
                (1700, 'Tomatoa', '562668754', '2016-05-14 18:17:32', 2, 20, 1, ''),
                (1700, 'Tomato', '562668754', '2016-05-14 18:17:33', 3, 6, 1, ''),
                (2004, 'Carrot', '562668754', '2016-05-20 13:56:47', 2, 14, 1, ''),
                (2004, 'Tomato', '562668754', '2016-05-20 13:56:48', 3, 6, 1, ''),
                (2055, 'Carrot', '704238953', '2016-05-26 07:40:34', 1, 7, 1, ''),
                (2055, 'Tomato', '704238953', '2016-05-26 07:40:34', 2, 4, 1, ''),
                (2102, 'Apple', '704238953', '2016-05-26 07:35:05', 3, 6, 1, ''),
                (2516, 'Potato', '704238953', '2016-05-03 15:09:43', 1, 10, 1, 'Carton'),
                (2771, 'Qiwi', '562668754', '2016-05-25 19:46:16', 4, 8, 1, ''),
                (3081, 'Broccoli', '704238953', '2016-05-14 11:04:26', 2, 10, 1, ''),
                (3081, 'Apple', '704238953', '2016-05-14 11:04:26', 2, 4, 1, ''),
                (3081, 'Qiwi', '704238953', '2016-05-14 11:04:26', 2, 4, 1, ''),
                (3109, 'Strawberry', '562668754', '2016-06-08 18:36:51', 3, 24, 1, ''),
                (3109, 'Qiwi', '562668754', '2016-06-08 18:36:50', 9, 18, 1, ''),
                (3163, 'Broccoli', '562668754', '2016-05-07 19:21:50', 3, 15, 1, ''),
                (3163, 'Apple', '562668754', '2016-05-07 19:21:53', 4, 8, 1, ''),
                (3163, 'Salad', '562668754', '2016-05-07 19:21:50', 4, 12, 1, ''),
                (3362, 'Carrot', '704238953', '2016-05-26 07:38:41', 1, 7, 1, ''),
                (3440, 'Rocca', '562668754', '2016-06-04 17:09:08', 1, 1, 1, ''),
                (3440, 'Carrot', '562668754', '2016-06-04 17:09:08', 4, 28, 1, ''),
                (3440, 'Tomato', '562668754', '2016-06-04 17:09:08', 3, 6, 1, ''),
                (3613, 'Potato', '562668754', '2016-04-29 23:49:48', 0, 0, 1, 'Carton'),
                (3613, 'Apple', '562668754', '2016-04-29 23:49:48', 9, 18, 1, 'lb'),
                (3613, 'Carrot', '562668754', '2016-04-29 23:49:47', 8, 8, 1, 'lb'),
                (3613, 'Salad', '562668754', '2016-04-29 23:49:48', 5, 5, 1, 'lb'),
                (3613, 'Tomato', '562668754', '2016-04-29 23:49:48', 7, 14, 1, 'lb'),
                (3613, 'Qiwi', '562668754', '2016-04-29 23:49:48', 6, 12, 1, 'lb'),
                (3731, 'Carrot', '562668754', '2016-05-21 00:02:56', 3, 21, 1, ''),
                (3731, 'Tomato', '562668754', '2016-05-21 00:02:56', 2, 4, 1, ''),
                (3762, 'Potato', '598078834', '2016-04-29 23:40:15', 1, 10, 1, 'Carton'),
                (3762, 'Carrot', '598078834', '2016-04-29 23:40:15', 1, 1, 1, 'lb'),
                (3762, 'Salad', '598078834', '2016-04-29 23:40:15', 4, 4, 1, 'lb'),
                (3762, 'Tomato', '598078834', '2016-04-29 23:40:15', 2, 4, 1, 'lb'),
                (3762, 'Qiwi', '598078834', '2016-04-29 23:40:15', 3, 6, 1, 'lb'),
                (3772, 'Broccoli', '562668754', '2016-05-14 16:40:44', 1, 5, 1, ''),
                (3772, 'Apple', '562668754', '2016-05-14 16:40:52', 1, 2, 1, ''),
                (3772, 'Carrot', '562668754', '2016-05-14 16:40:50', 5, 35, 1, ''),
                (3772, 'Salad', '562668754', '2016-05-14 16:40:52', 1, 3, 1, ''),
                (3772, 'Tomato', '562668754', '2016-05-14 16:40:50', 5, 10, 1, ''),
                (3772, 'Qiwi', '562668754', '2016-05-14 16:40:52', 5, 10, 1, ''),
                (4304, 'Potato', '562668754', '2016-05-07 18:54:38', 3, 30, 1, ''),
                (4304, 'Tomato', '562668754', '2016-05-07 18:54:38', 5, 10, 1, ''),
                (4304, 'Qiwi', '562668754', '2016-05-07 18:54:38', 2, 4, 1, ''),
                (4543, 'Tomato', '562668754', '2016-04-26 20:15:09', 1, 2, 1, 'lb'),
                (4635, 'Potato', '562668754', '2016-05-15 18:40:52', 2, 20, 1, ''),
                (4635, 'Carrot', '562668754', '2016-05-15 18:40:52', 5, 35, 1, ''),
                (4635, 'Tomatoa', '562668754', '2016-05-15 18:40:53', 3, 30, 1, ''),
                (4635, 'Tomato', '562668754', '2016-05-15 18:40:52', 4, 8, 1, ''),
                (4965, 'Carrot', '562668754', '2016-06-03 01:08:03', 4, 28, 1, ''),
                (4965, 'Tomato', '562668754', '2016-06-03 01:08:03', 5, 10, 1, ''),
                (5534, 'Potato', '562668754', '2016-05-07 18:57:30', 3, 30, 1, ''),
                (5534, 'Carrot', '562668754', '2016-05-07 18:57:29', 3, 21, 1, ''),
                (5534, 'Tomatoa', '562668754', '2016-05-07 18:57:30', 3, 30, 1, ''),
                (5534, 'Tomato', '562668754', '2016-05-07 18:57:29', 3, 6, 1, ''),
                (5534, 'Qiwi', '562668754', '2016-05-07 18:57:29', 4, 8, 1, ''),
                (5595, 'Purslane', '562668754', '2016-06-24 21:11:22', 3, 25, 1, ''),
                (5595, 'Orange', '562668754', '2016-06-24 21:11:22', 1, 30, 1, ''),
                (5595, 'Parsley', '562668754', '2016-06-24 21:11:21', 3, 3, 1, ''),
                (5595, 'Rocca', '562668754', '2016-06-24 21:11:21', 3, 3, 1, ''),
                (5595, 'Carrot', '562668754', '2016-06-24 21:11:21', 3, 15, 1, ''),
                (5595, 'Watermelon', '562668754', '2016-06-24 21:11:21', 2, 50, 1, ''),
                (5595, 'Grape', '562668754', '2016-06-24 21:11:22', 2, 30, 1, ''),
                (5595, 'Leeks', '562668754', '2016-06-24 21:11:22', 3, 3, 1, ''),
                (5595, 'Coriander', '562668754', '2016-06-24 21:11:22', 3, 3, 1, ''),
                (5595, 'Green Orange', '562668754', '2016-06-24 21:11:21', 1, 15, 1, ''),
                (5595, 'Yellow lemon', '562668754', '2016-06-24 21:11:22', 3, 30, 1, ''),
                (5595, 'Mango Alfa', '562668754', '2016-06-24 21:11:22', 1, 30, 1, ''),
                (5595, 'Banana', '562668754', '2016-06-24 21:11:21', 3, 24, 1, ''),
                (5660, 'Carrot', '562668754', '2016-06-02 21:58:13', 4, 28, 1, ''),
                (5660, 'Tomato', '562668754', '2016-06-02 21:58:13', 5, 10, 1, ''),
                (5773, 'Apple', '704238953', '2016-04-27 03:29:36', 2, 4, 1, 'lb'),
                (5773, 'Salad', '704238953', '2016-04-27 03:29:36', 6, 6, 1, 'lb'),
                (5773, 'Tomato', '704238953', '2016-04-27 03:29:35', 1, 2, 1, 'lb'),
                (5773, 'Qiwi', '704238953', '2016-04-27 03:29:36', 2, 4, 1, 'lb'),
                (5788, 'Carrot', '541677543', '2016-05-07 21:53:01', 1, 7, 1, ''),
                (5788, 'Tomatoa', '541677543', '2016-05-07 21:53:02', 4, 40, 1, ''),
                (5788, 'Tomato', '541677543', '2016-05-07 21:53:01', 1, 2, 1, ''),
                (5909, 'Parsley', '562668754', '2016-06-25 17:01:35', 1, 1, 1, ''),
                (5909, 'Rocca', '562668754', '2016-06-25 17:01:35', 2, 2, 1, ''),
                (5909, 'Carrot', '562668754', '2016-06-25 17:01:35', 2, 10, 1, ''),
                (5909, 'Coriander', '562668754', '2016-06-25 17:01:35', 2, 2, 1, ''),
                (6262, 'Carrot', '562668754', '2016-05-30 14:12:20', 3, 21, 1, ''),
                (6262, 'Tomato', '562668754', '2016-05-30 14:12:20', 8, 16, 1, ''),
                (6304, 'Parsley', '562668754', '2016-06-24 21:11:25', 3, 3, 1, ''),
                (6304, 'Rocca', '562668754', '2016-06-24 21:11:25', 3, 3, 1, ''),
                (6304, 'Carrot', '562668754', '2016-06-24 21:11:25', 3, 15, 1, ''),
                (6304, 'Watermelon', '562668754', '2016-06-24 21:11:25', 2, 50, 1, ''),
                (6304, 'Coriander', '562668754', '2016-06-24 21:11:25', 3, 3, 1, ''),
                (6304, 'Green Orange', '562668754', '2016-06-24 21:11:25', 1, 15, 1, ''),
                (6304, 'Yellow lemon', '562668754', '2016-06-24 21:11:26', 3, 30, 1, ''),
                (6304, 'Banana', '562668754', '2016-06-24 21:11:25', 3, 24, 1, ''),
                (6798, 'Watermelon', '704238953', '2016-05-30 18:55:50', 3, 30, 1, ''),
                (6826, 'Purslane', '562668754', '2016-06-24 21:11:24', 3, 25, 1, ''),
                (6826, 'Orange', '562668754', '2016-06-24 21:11:24', 1, 30, 1, ''),
                (6826, 'Parsley', '562668754', '2016-06-24 21:11:24', 3, 3, 1, ''),
                (6826, 'Rocca', '562668754', '2016-06-24 21:11:23', 3, 3, 1, ''),
                (6826, 'Carrot', '562668754', '2016-06-24 21:11:23', 3, 15, 1, ''),
                (6826, 'Watermelon', '562668754', '2016-06-24 21:11:23', 2, 50, 1, ''),
                (6826, 'Grape', '562668754', '2016-06-24 21:11:24', 2, 30, 1, ''),
                (6826, 'Leeks', '562668754', '2016-06-24 21:11:24', 3, 3, 1, ''),
                (6826, 'Coriander', '562668754', '2016-06-24 21:11:23', 3, 3, 1, ''),
                (6826, 'Green Orange', '562668754', '2016-06-24 21:11:23', 1, 15, 1, ''),
                (6826, 'Yellow lemon', '562668754', '2016-06-24 21:11:23', 3, 30, 1, ''),
                (6826, 'Mango Alfa', '562668754', '2016-06-24 21:11:24', 1, 30, 1, ''),
                (6826, 'Banana', '562668754', '2016-06-24 21:11:23', 3, 24, 1, ''),
                (7021, 'Qiwi', '562668754', '2016-04-26 20:14:49', 3, 6, 1, 'lb'),
                (7102, 'Carrot', '562668754', '2016-05-07 19:05:21', 8, 56, 1, ''),
                (7102, 'Tomato', '562668754', '2016-05-07 19:05:21', 12, 24, 1, ''),
                (7450, 'Carrot', '562668754', '2016-05-14 16:51:37', 2, 14, 1, ''),
                (7450, 'Tomato', '562668754', '2016-05-14 16:51:38', 2, 4, 1, ''),
                (7776, 'Carrot', '562668754', '2016-05-30 14:12:22', 3, 21, 1, ''),
                (7776, 'Tomato', '562668754', '2016-05-30 14:12:22', 8, 16, 1, ''),
                (7979, 'Potato', '562668754', '2016-06-17 18:26:52', 5, 50, 1, ''),
                (7979, 'Carrot', '562668754', '2016-06-17 18:26:51', 5, 25, 1, ''),
                (7979, 'Strawberry', '562668754', '2016-06-17 18:26:51', 3, 24, 1, ''),
                (7980, 'Strawberry', '562668754', '2016-06-08 18:36:53', 3, 24, 1, ''),
                (7980, 'Qiwi', '562668754', '2016-06-08 18:36:53', 9, 18, 1, ''),
                (8002, 'Tomato', '704238953', '2016-04-27 03:31:06', 3, 6, 1, 'lb'),
                (8002, 'Qiwi', '704238953', '2016-04-27 03:31:06', 3, 6, 1, 'lb'),
                (8137, 'Carrot', '562668754', '2016-05-19 19:00:00', 5, 35, 1, ''),
                (8137, 'Tomato', '562668754', '2016-05-19 19:00:00', 9, 18, 1, ''),
                (8281, 'Potato', '562668754', '2016-05-24 14:35:00', 3, 30, 1, ''),
                (8281, 'Carrot', '562668754', '2016-05-24 14:35:00', 3, 21, 1, ''),
                (8281, 'Tomato', '562668754', '2016-05-24 14:35:00', 4, 8, 1, ''),
                (8664, 'Carrot', '704238953', '2016-05-06 15:49:06', 1, 7, 1, ''),
                (8664, 'Tomato', '704238953', '2016-05-06 15:49:06', 1, 2, 1, ''),
                (9680, 'Avokado', '562668754', '2016-06-12 21:16:16', 2, 40, 1, ''),
                (9680, 'Potato', '562668754', '2016-06-12 21:16:16', 3, 30, 1, ''),
                (9680, 'Carrot', '562668754', '2016-06-12 21:16:16', 5, 25, 1, ''),
                (9680, 'Watermelon', '562668754', '2016-06-12 21:16:17', 2, 50, 1, ''),
                (9680, 'Tomato', '562668754', '2016-06-12 21:16:16', 5, 10, 1, ''),
                (9680, 'Strawberry', '562668754', '2016-06-12 21:16:16', 2, 16, 1, ''),
                (9843, 'Qiwi', '704238953', '2016-05-26 09:20:13', 4, 8, 1, ''),
                (9872, 'Carrot', '704238953', '2016-05-19 05:42:12', 1, 7, 1, ''),
                (9872, 'Tomato', '704238953', '2016-05-19 05:42:12', 3, 6, 1, '');
            ");
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

}