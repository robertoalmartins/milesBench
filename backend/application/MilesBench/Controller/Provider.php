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

class Provider {

    public function load(Request $request, Response $response) {
        $dados = $request->getRow();

        $em = Application::getInstance()->getEntityManager();
        $BusinessPartner = $em->getRepository('Businesspartner')->findAll(array('partnerType' => 'P'));

        $dataset = array();
        foreach($BusinessPartner as $Provider){
            $dataset[] = array(
                'id' => $Provider->getId(),
                'name' => $Provider->getName(),
                'city' => $Provider->getCity()->getName()
            );

        }
        $response->setDataset($dataset);
    }

}