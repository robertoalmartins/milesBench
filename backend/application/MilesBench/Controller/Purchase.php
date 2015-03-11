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

class purchase {

    public function save(Request $request, Response $response) {
        $dados = $request->getRow();
        $em = Application::getInstance()->getEntityManager();

        try {
            $em->getConnection()->beginTransaction();

            $BusinessPartner = $em->getRepository('Businesspartner')->findOneBy(array('name' => $dados['name']));
            if (!$BusinessPartner) {
                $BusinessPartner = new \Businesspartner();
                $BusinessPartner->setName($dados['name']);
                $BusinessPartner->setPhoneNumber($dados['phoneNumber']);
                $BusinessPartner->setCity($em->getRepository('City')->findOneBy(array('name' => substr($dados['city'],0,strrpos($dados['city'],',')))));
                $BusinessPartner->setRegistrationCode($dados['registrationCode']);
                $BusinessPartner->setAdress($dados['adress']);
                $BusinessPartner->setEmail($dados['email']);
                $BusinessPartner->setPartnerType('P');
                $em->persist($BusinessPartner);
                $em->flush($BusinessPartner);
            }

            $Cards = $em->getRepository('cards')->findOneBy(array('cardNumber' => $dados['card_number']));
            if (!$Cards) {
                $Cards = new \Cards();
                $Cards->setCardNumber($dados['card_number']);
                $Cards->setAccessPassword($dados['access_password']);
                $Cards->setAccessId($dados['access_id']);
                $Cards->setRecoveryPassword($dados['recovery_password']);
                $Cards->setAirline($em->getRepository('Airline')->findOneBy(array('name' => $dados['airline'])));
                $Cards->setBusinesspartner($BusinessPartner);
                $em->persist($Cards);
                $em->flush($Cards);
            }

            $Purchase = new \Purchase();
            $Purchase->setPurchaseMiles($dados['purchase_miles']);
            $Purchase->setPurchaseDate(new \Datetime());
            $Purchase->setCostPerThousand($dados['cost_per_thousand']);
            $Purchase->setTotalCost($dados['total_cost']);
            $Purchase->setAproved('Y');
            $Purchase->setMilesDueDate(new \Datetime($dados['miles_due_date']));
            $Purchase->setCards($Cards);
            $em->persist($Purchase);
            $em->flush($Purchase);

            $MilesBench = $em->getRepository('Milesbench')->findOneBy(array('cards' => $Cards));
            if (!$MilesBench) {
                $MilesBench = new \MilesBench();
                $MilesBench->setLastChange(new \Datetime());
                $MilesBench->setCostPerThousand($dados['cost_per_thousand']);
                $MilesBench->setCards($Cards);
                $MilesBench->setDueDate(new \Datetime($dados['miles_due_date']));
            }
            $MilesBench->setLeftOver($MilesBench->getLeftOver() + $dados['purchase_miles']);
            $em->persist($MilesBench);
            $em->flush($MilesBench);

            $em->getConnection()->commit();

            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::SUCCESS);
            $message->setText('Registro alterado com sucesso');
            $response->addMessage($message);

        } catch (Exception $e) {
            $em->getConnection()->rollback();
            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::ERROR);
            $message->setText($e->getMessage());
            $response->addMessage($message);
        }
    }
}