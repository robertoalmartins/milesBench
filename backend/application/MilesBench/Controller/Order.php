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

class order {

    public function load(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $sql = "select s FROM Sale s WHERE s.status not in ('X','C') ORDER BY s.issueDate DESC";
        $query = $em->createQuery($sql);
        $order = $query->getResult();

        $dataset = array();
        foreach($order as $item){
            $dataset[] = array(
                'status' => $item->getStatus(),
                'client' => $item->getClient()->getName(),
                'email' => $item->getClient()->getEmail(),
                'phoneNumber' => $item->getClient()->getPhoneNumber(),
                'airline' => $item->getAirline()->getName(),
                'from' => $item->getFrom()->getCode(),
                'to' => $item->getTo()->getCode(),
                'milesUsed' => $item->getMilesUsed(),
                'issueDate' => $item->getIssueDate()->format('d/m/y'),
                'boardingDate' => $item->getBoardingDate()->format('d/m/y'),
                'returnDate' => $item->getReturnDate()->format('d/m/y')
            );

        }
        $response->setDataset($dataset);
    }

    public function loadOpened(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $order = $em->getRepository('Sale')->findAll(array('status' => 'P'));

        $dataset = array();
        foreach($order as $item){
            $dataset[] = array(
                'status' => $item->getStatus(),
                'client' => $item->getClient()->getName(),
                'email' => $item->getClient()->getEmail(),
                'phoneNumber' => $item->getClient()->getPhoneNumber(),
                'airline' => $item->getAirline()->getName(),
                'from' => $item->getFrom()->getCode(),
                'to' => $item->getTo()->getCode(),
                'milesUsed' => $item->getMilesUsed(),
                'issueDate' => $item->getIssueDate()->format('d/m/y'),
                'boardingDate' => $item->getBoardingDate()->format('d/m/y'),
                'returnDate' => $item->getReturnDate()->format('d/m/y')
            );

        }
        $response->setDataset($dataset);
    }
}