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

class Client {

    public function load(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $BusinessPartner = $em->getRepository('Businesspartner')->findBy(array('partnerType' => 'C'));

        $dataset = array();
        foreach($BusinessPartner as $Provider){
            $City = $Provider->getCity();
            $dataset[] = array(
                'id' => $Provider->getId(),
                'name' => $Provider->getName(),
                'city' => $City->getName() . ', ' . $City->getState(),
                'registrationCode' => $Provider->getRegistrationCode(),
                'adress' => $Provider->getAdress(),
                'partnerType' => $Provider->getPartnerType(),
                'email' => $Provider->getEmail(),
                'phoneNumber' => $Provider->getPhoneNumber()
            );

        }
        $response->setDataset($dataset);
    }
}