<?php
namespace MilesBench\Config;

/**
 * Created by PhpStorm.
 * User: robertomartins
 * Date: 1/4/2015
 * Time: 6:23 PM
 */

class connectionManager {

    static $devParams = array(
        'dbname' => 'milesbench',
        'user' => 'milesbenchdb',
        'password' => 'Milesbench2@15',
        'host' => 'localhost:3306',
        'driver' => 'pdo_mysql'
    );


    public function getParams() {
        return self::$devParams;
    }
}