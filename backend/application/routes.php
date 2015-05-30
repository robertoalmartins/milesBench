<?php
$routes = array(
    '/login' => '\MilesBench\Controller\Login::login',
    '/loadProvider' => '\MilesBench\Controller\Provider::load',
    '/saveProvider' => '\MilesBench\Controller\Businesspartner::save',
    '/removeProvider' => '\MilesBench\Controller\Businesspartner::remove',
    '/loadProviderAirlineCard' => '\MilesBench\Controller\Cards::loadProviderAirline',
    '/loadProviderCards' => '\MilesBench\Controller\Cards::loadProvider',
    '/saveProviderCards' => '\MilesBench\Controller\Cards::save',
    '/loadCity' => '\MilesBench\Controller\City::load',
    '/loadState' => '\MilesBench\Controller\City::loadState',
    '/loadMiles' => '\MilesBench\Controller\Miles::load',
    '/loadSalesMiles' => '\MilesBench\Controller\Miles::loadByMilesUsed',
    '/loadOpenedOrder' => '\MilesBench\Controller\Order::loadOpened',
    '/loadOrder' => '\MilesBench\Controller\Order::load',
    '/saveOrder' => '\MilesBench\Controller\Order::save',
    '/removeOrder' => '\MilesBench\Controller\Order::remove',
    '/mailOrder' => '\MilesBench\Controller\Order::mail',
    '/loadClient' => '\MilesBench\Controller\Client::load',
    '/saveClient' => '\MilesBench\Controller\Businesspartner::save',
    '/removeClient' => '\MilesBench\Controller\Businesspartner::remove',
    '/loadProfile' => '\MilesBench\Controller\Profile::load',
    '/saveProfile' => '\MilesBench\Controller\Businesspartner::save',
    '/removeProfile' => '\MilesBench\Controller\Businesspartner::remove',
    '/loadAirport' => '\MilesBench\Controller\Airport::load',
    '/loadAirline' => '\MilesBench\Controller\Airline::load',
    '/saveSale' => '\MilesBench\Controller\Sale::save',
    '/savePurchase' => '\MilesBench\Controller\Purchase::save'
);


