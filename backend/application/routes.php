<?php
$routes = array(
    '/login' => '\MilesBench\Controller\Login::login',
    '/loadProvider' => '\MilesBench\Controller\Provider::load',
    '/saveProvider' => '\MilesBench\Controller\Businesspartner::save',
    '/removeProvider' => '\MilesBench\Controller\Businesspartner::remove',
    '/loadCity' => '\MilesBench\Controller\City::load',
    '/loadState' => '\MilesBench\Controller\City::loadState',
    '/loadMiles' => '\MilesBench\Controller\Miles::load',
    '/loadSalesMiles' => '\MilesBench\Controller\Miles::loadByMilesUsed',
    '/loadOpenedOrder' => '\MilesBench\Controller\Order::loadOpened',
    '/loadOrder' => '\MilesBench\Controller\Order::load',
    '/saveOrder' => '\MilesBench\Controller\Order::save',
    '/removeOrder' => '\MilesBench\Controller\Order::remove',
    '/loadClient' => '\MilesBench\Controller\Client::load',
    '/saveClient' => '\MilesBench\Controller\Businesspartner::save',
    '/removeClient' => '\MilesBench\Controller\Businesspartner::remove',
    '/loadAirport' => '\MilesBench\Controller\Airport::load',
    '/loadAirline' => '\MilesBench\Controller\Airline::load',
    '/saveSale' => '\MilesBench\Controller\Sale::save',
    '/savePurchase' => '\MilesBench\Controller\Purchase::save'
);


