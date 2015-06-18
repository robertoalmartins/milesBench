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

class cards {
    public function loadProviderAirline(Request $request, Response $response) {
        $dados = $request->getRow();
        $em = Application::getInstance()->getEntityManager();
    	
        $em = Application::getInstance()->getEntityManager();
        $sql = "select c FROM Cards c JOIN c.businesspartner b JOIN c.airline a WHERE b.name = '".$dados['name']."' AND a.name = '".$dados['airline']."'";
        $query = $em->createQuery($sql);
        $Cards = $query->getResult();


        $dataset = array();
        foreach($Cards as $card){
	        $dataset[] = array(
	            'card_number' => $card->getCardNumber(),
	            'access_id' => $card->getAccessId(),
	            'access_password' => $card->getAccessPassword(),
	            'recovery_password' => $card->getRecoveryPassword()
	        );
	    }
        $response->setDataset($dataset);
    }
    
    public function loadProvider(Request $request, Response $response) {
        $dados = $request->getRow();
        $dataset = array();

        if (isset($dados['providerRow'])) {
           $em = Application::getInstance()->getEntityManager();
           $cardNumberSQL = '';
          
           if (isset($dados['providerFilter'])&&($dados['providerFilter']['card_number'] != '')) {
              $cardNumberSQL = " AND c.cardNumber = '".$dados['providerFilter']['card_number']."'";
           }

           $sql = "select m, c, a FROM Milesbench m JOIN m.cards c JOIN c.businesspartner b JOIN c.airline a WHERE b.registrationCode = '".$dados['providerRow']['registrationCode']."'".$cardNumberSQL;
           $query = $em->createQuery($sql);
           $Cards = $query->getResult();


           foreach($Cards as $card){
               $dataset[] = array(
                   'id' => $card->getCards()->getId(),
                   'card_number' => $card->getCards()->getCardNumber(),
                   'airline' => $card->getCards()->getAirline()->getName(),
                   'card_number' => $card->getCards()->getCardNumber(),
                   'access_id' => $card->getCards()->getAccessId(),
                   'access_password' => $card->getCards()->getAccessPassword(),
                   'recovery_password' => $card->getCards()->getRecoveryPassword(),
                   'miles_leftover' => $card->getLeftover()
               );
           }
            
        }
        $response->setDataset($dataset);
    }    	

    public function save(Request $request, Response $response) {
        $dados = $request->getRow();
        $em = Application::getInstance()->getEntityManager();

        $Cards = $em->getRepository('Cards')->findOneBy(array('id' => $dados['id']));
        if ($Cards) {
            $Cards->setCardNumber($dados['card_number']);
            $Cards->setAccessPassword($dados['access_password']);
            $Cards->setAccessId($dados['access_id']);
            $Cards->setRecoveryPassword($dados['recovery_password']);
            $em->persist($Cards);
            $em->flush($Cards);
        }    
        
        $message = new \MilesBench\Message();
        $message->setType(\MilesBench\Message::SUCCESS);
        $message->setText('Registro alterado com sucesso');
        $response->addMessage($message);        
    }
}	

