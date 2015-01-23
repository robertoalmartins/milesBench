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
                'city' => $Provider->getCity()->getName(),
                'registrationCode' => $Provider->getRegistrationCode(),
                'adress' => $Provider->getAdress(),
                'partnerType' => $Provider->getPartnerType(),
                'email' => $Provider->getEmail(),
                'phoneNumber' => $Provider->getPhoneNumber()
            );

        }
        $response->setDataset($dataset);
    }

    public function save(Request $request, Response $response) {
        $dados = $request->getRow();

        try {
            $em = Application::getInstance()->getEntityManager();
            $BusinessPartner = $em->getRepository('Businesspartner')->find(1);
            $BusinessPartner->setName($dados['name']);
            $BusinessPartner->setPhoneNumber($dados['phoneNumber']);
            //$BusinessPartner->setCity($dados['city']);
            $BusinessPartner->setRegistrationCode($dados['registrationCode']);
            $BusinessPartner->setAdress($dados['adress']);
            $BusinessPartner->setEmail($dados['email']);
            $em->persist($BusinessPartner);
            $em->flush($BusinessPartner);

            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::SUCCESS);
            $message->setText('Registro alterado com sucesso');
            $response->addMessage($message);

        } catch (Exception $e) {
            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::ERROR);
            $message->setText($e->getMessage());
            $response->addMessage($message);
        }
    }
}