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

class sale {

    public function save(Request $request, Response $response) {
        $dados = $request->getRow();
        $em = Application::getInstance()->getEntityManager();

        try {
            $em->getConnection()->beginTransaction();

            $BusinessPartner = $em->getRepository('Businesspartner')->findOneBy(array('name' => $dados['paxName']));
            if (!$BusinessPartner) {
                $BusinessPartner = new \Businesspartner();
                $BusinessPartner->setName($dados['paxName']);
                $BusinessPartner->setRegistrationCode($dados['paxRegistrationCode']);
                $BusinessPartner->setPartnerType('X');
            } else {
                if (strpos($BusinessPartner->getPartnerType(),'X')) {
                    $BusinessPartner->setPartnerType($BusinessPartner->getPartnerType()+'_X');
                }
            }
            $em->persist($BusinessPartner);
            $em->flush($BusinessPartner);

            $Cards = $em->getRepository('cards')->findOneBy(array('cardNumber' => $dados['cardNumber']));
            
            $Sale = $em->getRepository('Sale')->find($dados['id']);
            $Sale->setFlightLocator($dados['flightLocator']);
            $Sale->setCheckinState($dados['checkinState']);
            $Sale->setTax($dados['tax']);
            $Sale->setMilesUsed($dados['milesUsed']);
            $Sale->setTotalCost($dados['totalCost']);
            $Sale->setAmountPaid($dados['amountPaid']);
            $Sale->setKickback($dados['kickback']);
            $Sale->setPax($BusinessPartner);
            $Sale->setStatus('Emitido');
            $Sale->setCards($Cards);
            $em->persist($Sale);
            $em->flush($Sale);

            $MilesBench = $em->getRepository('Milesbench')->findOneBy(array('cards' => $Cards));
            $MilesBench->setLeftOver($MilesBench->getLeftOver() - $Sale->getMilesUsed());
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