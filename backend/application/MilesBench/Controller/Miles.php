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

class miles {

    public function load(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $sql = "select c, b, a, m FROM Milesbench m JOIN m.cards c JOIN c.businesspartner b JOIN c.airline a";
        $query = $em->createQuery($sql);
        $milesbench = $query->getResult();

        $dataset = array();
        foreach($milesbench as $miles){
            $dataset[] = array(
                'name' => $miles->getCards()->getBusinesspartner()->getName(),
                'email' => $miles->getCards()->getBusinesspartner()->getEmail(),
                'phoneNumber' => $miles->getCards()->getBusinesspartner()->getPhoneNumber(),
                'card_number' => $miles->getCards()->getCardNumber(),
                'airline' => $miles->getCards()->getAirline()->getName(),
                'leftover' => $miles->getLeftover(),
                'due_date' => $miles->getDueDate()->format('d/m/y'),
                'contract_due_date' => $miles->getContractDueDate()->format('d/m/y'),
                'cost_per_thousand' => $miles->getCostPerThousand()
            );

        }
        $response->setDataset($dataset);
    }

    public function loadByMilesUsed(Request $request, Response $response) {
        $dados = $request->getRow();

        $em = Application::getInstance()->getEntityManager();
        if ($dados['cards']) {
            $sql = "select c, b, a, m FROM Milesbench m JOIN m.cards c JOIN c.businesspartner b JOIN c.airline a WHERE c.id = ".$dados['cards'];
        } else {
            $sql = "select c, b, a, m FROM Milesbench m JOIN m.cards c JOIN c.businesspartner b JOIN c.airline a WHERE m.leftover >= ".$dados['milesUsed']." and a.name = '".$dados['airline']."' ORDER BY m.leftover";
        }
        $query = $em->createQuery($sql);
        $milesbench = $query->getResult();

        $dataset = array();
        foreach($milesbench as $miles){
            $dataset[] = array(
                'name' => $miles->getCards()->getBusinesspartner()->getName(),
                'email' => $miles->getCards()->getBusinesspartner()->getEmail(),
                'phoneNumber' => $miles->getCards()->getBusinesspartner()->getPhoneNumber(),
                'card_number' => $miles->getCards()->getCardNumber(),
                'airline' => $miles->getCards()->getAirline()->getName(),
                'leftover' => $miles->getLeftover(),
                'due_date' => $miles->getDueDate()->format('d/m/y'),
                'contract_due_date' => $miles->getContractDueDate()->format('d/m/y'),
                'cost_per_thousand' => $miles->getCostPerThousand()
            );

        }
        $response->setDataset($dataset);
    }
}