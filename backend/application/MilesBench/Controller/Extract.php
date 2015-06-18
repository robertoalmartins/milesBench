<?php
/**
 * Created by PhpStorm.
 * User: robertomartins
 * Date: 1/19/2015
 * Time: 11:04 PM
 */

namespace MilesBench\Controller;

use MilesBench\Application;
use MilesBench\Model;
use MilesBench\Request\Request;
use MilesBench\Request\Response;

class Extract {

    public function load(Request $request, Response $response) {
        $dados = $request->getRow();
        $paxNameSQL = '';
        $flightLocatorSQL = '';
        $dataset = array();

        if (isset($dados['providerFilter'])&&($dados['providerFilter']['pax'] != '')) {
           $paxNameSQL = " AND b.name like '".$dados['providerFilter']['pax']."%'";
        }
        if (isset($dados['providerFilter'])&&($dados['providerFilter']['flight_locator'] != '')) {
           $flightLocatorSQL = " AND s.flightLocator = '".$dados['providerFilter']['flight_locator']."'";
        }

        $em = Application::getInstance()->getEntityManager();
        if (($paxNameSQL !== '') && ($flightLocatorSQL !== '')) {
           $sql = "select p FROM purchase p JOIN p.cards c WHERE c.id = ".$dados['cardsExtractRow']['id'] . " ORDER BY p.purchaseDate";
           $query = $em->createQuery($sql);
           $purchase = $query->getResult();

           foreach($purchase as $data){
              $dataset[] = array(
                   'id' => 'Compra',
                   'date' => $data->getPurchaseDate()->format('d/m/y'),
                   'description' => $data->getDescription(),
                   'value' => $data->getTotalCost(),
                   'miles' => $data->getPurchaseMiles(),
                   'name' => ''
              );
           }
        }

        $sql = "select s FROM sale s JOIN s.cards c JOIN s.pax b WHERE c.id = ".$dados['cardsExtractRow']['id'] . $paxNameSQL . $flightLocatorSQL . " ORDER BY s.boardingDate";
        $query = $em->createQuery($sql);
        $sale = $query->getResult();

        foreach($sale as $data){
           $dataset[] = array(
                'id' => 'Venda',
                'date' => $data->getBoardingDate()->format('d/m/y'),
                'description' => $data->getFlightLocator(),
                'value' => $data->getAmountPaid(),
                'miles' => $data->getMilesUsed(),
                'name' => $data->getPax()->getName()
           );
        }


        $response->setDataset($dataset);
    }
}