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

class Airline {

    public function load(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $Airline = $em->getRepository('Airline')->findAll();

        $dataset = array();
        foreach($Airline as $item){
            $dataset[] = array(
                'id' => $item->getId(),
                'name' => $item->getName()
            );

        }
        $response->setDataset($dataset);
    }
}