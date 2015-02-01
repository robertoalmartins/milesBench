<?php
/**
 * Created by PhpStorm.
 * User: robertomartins
 * Date: 1/26/2015
 * Time: 9:31 PM
 */

namespace MilesBench\Controller;

use MilesBench\Application;
use MilesBench\Model;
use MilesBench\Request\Request;
use MilesBench\Request\Response;

class City {

    public function load(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $Cities = $em->getRepository('City')->findAll();

        $dataset = array();
        foreach($Cities as $City){
            $dataset[] = array(
                'name' => $City->getName(),
                'id' => $City->getId(),
                'state' => $City->getState()
            );

        }
        $response->setDataset($dataset);
    }
}