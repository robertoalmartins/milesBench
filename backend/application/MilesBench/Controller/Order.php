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
use PHPMailer;
require dirname(__FILE__) . '/../../../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

class order {

    public function load(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $sql = "select s FROM Sale s WHERE s.status not in ('X','C') ORDER BY s.issueDate DESC";
        $query = $em->createQuery($sql);
        $order = $query->getResult();

        $dataset = array();
        foreach($order as $item){
            $cards = $item->getCards();
            if (isset($cards)) {
                $cards_id = $item->getCards()->getId();
            } else {
                $cards_id = '';
            }
            
            $dataset[] = array(
                'id' => $item->getId(),
                'status' => $item->getStatus(),
                'client' => $item->getClient()->getName(),
                'email' => $item->getClient()->getEmail(),
                'phoneNumber' => $item->getClient()->getPhoneNumber(),
                'airline' => $item->getAirline()->getName(),
                'pax' => $item->getPax()->getName(),
                'from' => $item->getAirportFrom()->getCode(),
                'to' => $item->getAirportTo()->getCode(),
                'milesUsed' => $item->getMilesUsed(),
                'description' => $item->getDescription(),
                'issueDate' => $item->getIssueDate()->format('Y-m-d'),
                'boardingDate' => $item->getBoardingDate()->format('Y-m-d'),
                'returnDate' => null,
                'airportNamefrom' => $item->getAirportFrom()->getName(),
                'airportNameto' => $item->getAirportTo()->getName(),
                'flight' => $item->getFlight(),
                'flightHour' => $item->getFlightHour(),
                'cards' => $cards_id
            );

        }
        $response->setDataset($dataset);
    }

    public function loadOpened(Request $request, Response $response) {
        $em = Application::getInstance()->getEntityManager();
        $order = $em->getRepository('Sale')->findBy(array('status' => 'Pendente'));

        $dataset = array();
        foreach($order as $item){
            $cards = $item->getCards();
            if (isset($cards)) {
                $cards_id = $item->getCards()->getId();
            } else {
                $cards_id = '';
            }
            
            $dataset[] = array(
                'id' => $item->getId(),
                'status' => $item->getStatus(),
                'client' => $item->getClient()->getName(),
                'email' => $item->getClient()->getEmail(),
                'phoneNumber' => $item->getClient()->getPhoneNumber(),
                'airline' => $item->getAirline()->getName(),
                'pax'=>$item->getPax()->getName(),
                'from' => $item->getAirportFrom()->getCode(),
                'to' => $item->getAirportTo()->getCode(),
                'milesUsed' => $item->getMilesUsed(),
                'issueDate' => $item->getIssueDate()->format('d/m/y'),
                'boardingDate' => $item->getBoardingDate()->format('d/m/y'),
                'airportNamefrom' => $item->getAirportFrom()->getName(),
                'airportNameto' => $item->getAirportTo()->getName(),
                'flight' => $item->getFlight(),
                'flightHour' => $item->getFlightHour(),
                'cards' => $cards_id
            );

        }
        $response->setDataset($dataset);
    }

    public function save(Request $request, Response $response) {
        $dados = $request->getRow();

        try {
            $em = Application::getInstance()->getEntityManager();
            $em->getConnection()->beginTransaction();            

            if ($dados['paxName'] != ''){
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
                $BusinessPartner->setBirthdate(new \Datetime($dados['birthdate']));
                $em->persist($BusinessPartner);
                $em->flush($BusinessPartner);
                $sale_pax = $BusinessPartner;
            }

            if (isset($dados['cardNumber'])){
                $Cards = $em->getRepository('Cards')->findOneBy(array('cardNumber' => $dados['cardNumber']));
                $sale_cards = $Cards;
            }
            
            $milesUsed = $dados['milesUsed'];
            $returned = false;
            if (isset($dados['id'])) {
                $Sale = $em->getRepository('Sale')->find($dados['id']);
            } else {
                $Sale = new \Sale();
                if (isset($dados['returnDate'])) {
                    $returned = true;
                    $milesUsed = ($dados['milesUsed'] / 2);
                }
            }
            
            $Sale->setPax($sale_pax);
            $Sale->setCards($sale_cards);
            $Sale->setIssueDate(new \Datetime());
            $Sale->setBoardingDate(new \Datetime($dados['boardingDate']));
            $Sale->setMilesUsed($milesUsed);
            $Sale->setDescription($dados['description']);
            $Sale->setAirline($em->getRepository('Airline')->findOneBy(array('name' => $dados['airline'])));
            $Sale->setAirportFrom($em->getRepository('Airport')->findOneBy(array('code' => substr($dados['from'],0,3))));
            $Sale->setAirportTo($em->getRepository('Airport')->findOneBy(array('code' => substr($dados['to'],0,3))));
            $Sale->setClient($em->getRepository('Businesspartner')->findOneBy(array('name' => $dados['client'])));
            $Sale->setStatus($dados['status']);
            $Sale->setFlight($dados['flight']);
            $Sale->setFlightHour($dados['flightHour']);
            $em->persist($Sale);
            $em->flush($Sale);

            $email[] = array(
                'cardNumber' => $dados['cardNumber'],
                'recoveryPassword' => $Cards->getRecoveryPassword(),
                'milesUsed' => $dados['milesUsed'],
                'paxName' => $dados['paxName'],
                'boardingDate' => $dados['boardingDate'],
                'flight' => $dados['flight'],
                'flightHour' => $dados['flightHour']);                
            
            if ($returned) {
                $Sale = new \Sale();
                $Sale->setPax($sale_pax);
                $Sale->setCards($sale_cards);
                $Sale->setIssueDate(new \Datetime());
                $Sale->setBoardingDate(new \Datetime($dados['returnDate']));
                $Sale->setMilesUsed($milesUsed);
                $Sale->setDescription($dados['description']);
                $Sale->setAirline($em->getRepository('Airline')->findOneBy(array('name' => $dados['airline'])));
                $Sale->setAirportFrom($em->getRepository('Airport')->findOneBy(array('code' => substr($dados['to'],0,3))));
                $Sale->setAirportTo($em->getRepository('Airport')->findOneBy(array('code' => substr($dados['from'],0,3))));
                $Sale->setClient($em->getRepository('Businesspartner')->findOneBy(array('name' => $dados['client'])));
                $Sale->setStatus($dados['status']);
                $Sale->setFlight($dados['return_flight']);
                $Sale->setFlightHour($dados['return_flightHour']);
                $em->persist($Sale);
                $em->flush($Sale);          

                $email[] = array(
                    'cardNumber' => $dados['cardNumber'],
                    'recoveryPassword' => $Cards->getRecoveryPassword(),
                    'milesUsed' => $dados['milesUsed'],
                    'paxName' => $dados['paxName'],
                    'boardingDate' => $dados['returnDate'],
                    'flight' => $dados['return_flight'],
                    'flightHour' => $dados['return_flightHour']);                
            }
        
            $em->getConnection()->commit();

            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::SUCCESS);
            $message->setText('Registro alterado com sucesso');
            $response->addMessage($message);
            if (isset($email)) {
                $response->setDataset($email);
            }

        } catch (Exception $e) {
            $em->getConnection()->rollback();
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

    public function mail(Request $request, Response $response) {
        $row = $request->getRow();
        try {
            self::SendOrderByMail($row);

            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::SUCCESS);
            $message->setText('Email enviado com sucesso');
            $response->addMessage($message);

        } catch (Exception $e) {
            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::ERROR);
            $message->setText($e->getMessage());
            $response->addMessage($message);
        }
    }

    public function SendOrderByMail($email){
        
        PHPMailerAutoload('PHPMailer');
        PHPMailerAutoload('pop3');
        PHPMailerAutoload('SMTP');
        $mail = new PHPMailer;

        $mail->SMTPDebug = 3;                               // Enable verbose debug output

        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.mail.yahoo.com';                  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'robertoalmartins@yahoo.com.br';    // SMTP username
        $mail->Password = 'perdigao1979';                     // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                                    // TCP port to connect to

        $mail->From = 'robertoalmartins@yahoo.com.br';
        $mail->FromName = 'Uai Milhas';
        $mail->addAddress('roberto.alpm@gmail.com', 'Leandro Miqueri');     // Add a recipient
        //$mail->addAddress('ellen@example.com');               // Name is optional
        //$mail->addReplyTo('info@example.com', 'Information');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');

        //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        $mail->addAttachment(dirname(__FILE__) . '/../../../img/emissao_ideal.png');    // Optional name
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = 'Emissao de Bilhetes';
        $html_body = 
        '<head>
            <style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 5px;
                    text-align: left;
                }
            </style>
        </head>

        <body>
            <table style="width:100%">
                <tr>
                    <th>Fidelidade</th>
                    <th>Senha Resgate</th>
                    <th>Quantidade de Pontos</th>
                    <th>Passageiro</th>
                    <th>Data Embarque</th>
                    <th>Data Retorno</th>
                    <th>Voo</th>
                    <th>Horario</th>
                </tr>
                <tr>
                    <td>'.$email['flight']['cardNumber'].'</td>
                    <td>'.$email['flight']['recoveryPassword'].'</td>
                    <td>'.$email['flight']['milesUsed'].'</td>
                    <td>'.$email['flight']['paxName'].'</td>
                    <td>'.$email['flight']['boardingDate'].'</td>
                    <td>'.$email['flight']['flight'].'</td>
                    <td>'.$email['flight']['flightHour'].'</td>
                </tr>
                <tr>
                    <td>'.$email['returnFlight']['cardNumber'].'</td>
                    <td>'.$email['returnFlight']['recoveryPassword'].'</td>
                    <td>'.$email['returnFlight']['milesUsed'].'</td>
                    <td>'.$email['returnFlight']['paxName'].'</td>
                    <td>'.$email['returnFlight']['boardingDate'].'</td>
                    <td>'.$email['returnFlight']['flight'].'</td>
                    <td>'.$email['returnFlight']['flightHour'].'</td>
                </tr>
            </table>
        </body>';

        $mail->Body = $html_body;
        //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            echo 'Message has been sent';
        }
    }
}