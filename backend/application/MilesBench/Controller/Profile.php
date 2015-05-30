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

class Profile {

    public function load(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $BusinessPartner = $em->getRepository('Businesspartner')->findBy(array('partnerType' => 'U', 'status' => 'Aprovado')));

        $dataset = array();
        foreach($BusinessPartner as $Profile){
            $City = $Profile->getCity();
            if ($City) {
                $city_name = $City->getName() . ', ' . $City->getState();
            } else {
                $city_name = '';
            }
            $dataset[] = array(
                'id' => $Profile->getId(),
                'name' => $Profile->getName(),
                'city' => $city_name,
                'registrationCode' => $Profile->getRegistrationCode(),
                'adress' => $Profile->getAdress(),
                'partnerType' => $Profile->getPartnerType(),
                'email' => $Profile->getEmail(),
                'password' => $Profile->getPassword(),
                'phoneNumber' => $Profile->getPhoneNumber(),
                'phoneNumber2' => $Profile->getPhoneNumber2(),
                'phoneNumber3' => $Profile->getPhoneNumber3()
            );

        }
        $response->setDataset($dataset);
    }
}