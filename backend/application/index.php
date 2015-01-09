<?php

require_once 'autoloader.php';
require_once 'routes.php';
require_once 'router.php';

$ds = DIRECTORY_SEPARATOR;
//$storagePath = realpath(dirname(__FILE__) . $ds .'storage');
//$entityManager = new \Pedidos\Db\FileEntityManager($storagePath);
 
//$application = \Pedidos\Application::getInstance();
//$application->setEntityManager($entityManager);

$rota = null;
if(isset($_GET['rota'])) {
    $rota = $_GET['rota'];
}else{
    $rota = 'default';
}
__route($rota, $routes);