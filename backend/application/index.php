<?php

require_once 'autoloader.php';
//require_once 'register.php';
require_once 'routes.php';
require_once 'router.php';

//require '/../vendor/autoload.php';
//require '/MilesBench/Config/connectionManager.php';
//require '/MilesBench/Application.php';

$ds = DIRECTORY_SEPARATOR;

//register::getLoader();

$rota = null;
if(isset($_GET['rota'])) {
    $rota = $_GET['rota'];
}else{
    $rota = '/login';
}
__route($rota, $routes);