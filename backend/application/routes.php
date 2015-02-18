<?php
$routes = array(
    '/login' => '\MilesBench\Controller\Login::login',
    '/loadProvider' => '\MilesBench\Controller\Provider::load',
    '/saveProvider' => '\MilesBench\Controller\Provider::save',
    '/removeProvider' => '\MilesBench\Controller\Provider::remove',
    '/loadCity' => '\MilesBench\Controller\City::load',
    '/loadMiles' => '\MilesBench\Controller\Miles::load',
    '/loadOpenedOrder' => '\MilesBench\Controller\Order::loadOpened',
    '/loadOrder' => '\MilesBench\Controller\Order::load'
);


