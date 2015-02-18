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
                'id' => $item->getId(),
                'status' => $item->getStatus(),
                'client' => $item->getClient()->getName(),
                'email' => $item->getClient()->getEmail(),
                'phoneNumber' => $item->getClient()->getPhoneNumber(),
                'airline' => $item->getAirline()->getName(),
                'from' => $item->getAirportFrom()->getCode(),
                'to' => $item->getAirportTo()->getCode(),
                'milesUsed' => $item->getMilesUsed(),
                'description' => $item->getDescription(),
                'issueDate' => $item->getIssueDate()->format('Y-m-d'),
                'boardingDate' => $item->getBoardingDate()->format('Y-m-d'),
                'returnDate' => $item->getReturnDate()->format('Y-m-d')
            );

        }
        $response->setDataset($dataset);
    }

    public function loadOpened(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $order = $em->getRepository('Sale')->findBy(array('status' => 'Pendente'));

        $dataset = array();
        foreach($order as $item){
            $dataset[] = array(
                'id' => $item->getId(),
                'status' => $item->getStatus(),
                'client' => $item->getClient()->getName(),
                'email' => $item->getClient()->getEmail(),
                'phoneNumber' => $item->getClient()->getPhoneNumber(),
                'airline' => $item->getAirline()->getName(),
                'from' => $item->getAirportFrom()->getCode(),
                'to' => $item->getAirportTo()->getCode(),
                'milesUsed' => $item->getMilesUsed(),
                'issueDate' => $item->getIssueDate()->format('d/m/y'),
                'boardingDate' => $item->getBoardingDate()->format('d/m/y'),
                'returnDate' => $item->getReturnDate()->format('d/m/y')
            );

        }
        $response->setDataset($dataset);
    }

    public function save(Request $request, Response $response) {
        $dados = $request->getRow();

        try {
            $em = Application::getInstance()->getEntityManager();
            if ($dados['id']) {
                $Sale = $em->getRepository('Sale')->find($dados['id']);
            } else {
                $Sale = new \Sale();
            }
            $Sale->setIssueDate(new \Datetime($dados['issueDate']));
            $Sale->setBoardingDate(new \Datetime($dados['boardingDate']));
            $Sale->setReturnDate(new \Datetime($dados['returnDate']));
            $Sale->setMilesUsed($dados['milesUsed']);
            $Sale->setDescription($dados['description']);
            $Sale->setAirline($em->getRepository('Airline')->findOneBy(array('name' => $dados['airline'])));
            $Sale->setAirportFrom($em->getRepository('Airport')->findOneBy(array('code' => $dados['from'])));
            $Sale->setAirportTo($em->getRepository('Airport')->findOneBy(array('code' => $dados['to'])));
            $Sale->setClient($em->getRepository('Businesspartner')->findOneBy(array('name' => $dados['client'])));
            $Sale->setStatus($dados['status']);
            $em->persist($Sale);
            $em->flush($Sale);

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
            $Sale = $em->getRepository('Sale')->find($dados['id']);
            $em->remove($Sale);
            $em->flush($Sale);

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