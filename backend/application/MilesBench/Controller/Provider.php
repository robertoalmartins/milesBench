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

        $CardsSubSQL = '';

        if (isset($dados['pax'])||isset($dados['flight_locator'])||isset($dados['card_number'])) {
           $CardsSubSQL = " AND EXISTS (select c FROM Cards c WHERE c.businesspartner = bp.id";
           if (isset($dados)&&($dados['card_number'] != '')) {
              $CardsSubSQL = $CardsSubSQL . " AND c.cardNumber = '".$dados['card_number']."'";
           }
           if (isset($dados)&&($dados['pax'] != '')) {
              $CardsSubSQL = $CardsSubSQL . " AND EXISTS (select s FROM Sale s JOIN s.pax b WHERE s.cards = c.id AND b.name like '".$dados['pax']."%')";
           }
           if (isset($dados)&&($dados['flight_locator'] != '')) {
              $CardsSubSQL = $CardsSubSQL . " AND EXISTS (select s FROM Sale s WHERE s.cards = c.id AND s.flightLocator = '".$dados['flight_locator']."')";
           }
           $CardsSubSQL = $CardsSubSQL .')';
        }
                
        $sql = "select bp FROM Businesspartner bp WHERE bp.partnerType = 'P'".$CardsSubSQL;
//        echo $sql;die;

        $query = $em->createQuery($sql);
        $BusinessPartner = $query->getResult();

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