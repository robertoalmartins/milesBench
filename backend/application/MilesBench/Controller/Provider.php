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
        $em = Application::getInstance()->getEntityManager();
        $BusinessPartner = $em->getRepository('Businesspartner')->findBy(array('partnerType' => 'P'));

        $dataset = array();
        foreach($BusinessPartner as $Provider){
            $City = $Provider->getCity();
            if ($City) {
                $cityname = $City->getName() . ', ' . $City->getState();
            } else {
                $cityname = '';
            }
            $dataset[] = array(
                'id' => $Provider->getId(),
                'name' => $Provider->getName(),
                'registrationCode' => $Provider->getRegistrationCode(),
                'city' => $cityname,
                'adress' => $Provider->getAdress(),
                'partnerType' => $Provider->getPartnerType(),
                'email' => $Provider->getEmail(),
                'phoneNumber' => $Provider->getPhoneNumber(),
                'phoneNumber2' => $Provider->getPhoneNumber2(),
                'phoneNumber3' => $Provider->getPhoneNumber3(),
                'status' => $Provider->getStatus()
            );

        }
        $response->setDataset($dataset);
    }

    public function save(Request $request, Response $response) {
        $dados = $request->getRow();

        try {
            $em = Application::getInstance()->getEntityManager();
            if ($dados['id']) {
                $BusinessPartner = $em->getRepository('Businesspartner')->find($dados['id']);
            } else {
                $BusinessPartner = new \Businesspartner();
            }
            $BusinessPartner->setName($dados['name']);
            $BusinessPartner->setPhoneNumber($dados['phoneNumber']);
            $BusinessPartner->setPhoneNumber2($dados['phoneNumber2']);
            $BusinessPartner->setPhoneNumber3($dados['phoneNumber3']);
            $BusinessPartner->setStatus($dados['status']);
            $BusinessPartner->setCity($em->getRepository('City')->findOneBy(array('name' => $dados['city'])));
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

    public function remove(Request $request, Response $response) {
        $dados = $request->getRow();
        try {
            $em = Application::getInstance()->getEntityManager();
            $BusinessPartner = $em->getRepository('Businesspartner')->find($dados['id']);
            $em->remove($BusinessPartner);
            $em->flush($BusinessPartner);

            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::SUCCESS);
            $message->setText('Registro removido com sucesso');
            $response->addMessage($message);

        } catch (Exception $e) {
            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::ERROR);
            $message->setText($e->getMessage());
            $response->addMessage($message);
        }
    }
}