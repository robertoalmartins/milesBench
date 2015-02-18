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

class Airport {

    public function load(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $Airport = $em->getRepository('Airport')->findAll(array('code' => 'ASC'));

        $dataset = array();
        foreach($Airport as $item){
            $dataset[] = array(
                'id' => $item->getId(),
                'code' => $item->getCode(),
                'name' => $item->getName()
            );

        }
        $response->setDataset($dataset);
    }
}