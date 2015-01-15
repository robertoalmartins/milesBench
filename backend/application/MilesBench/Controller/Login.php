<?php
namespace MilesBench\Controller;

use MilesBench\Application;
use MilesBench\Model;
use MilesBench\Request\Request;
use MilesBench\Request\Response;

/**
 * Description of Pedido
 *
 * @author tulio
 */
class Login {

    public function login(Request $request, Response $response) {
        $dados = $request->getRow();

        $em = Application::getInstance()->getEntityManager();
        $BusinessPartner = $em->getRepository('Businesspartner')->findOneBy(array('email' => $dados['email']));

        if (($BusinessPartner) && ($dados['email'] == $BusinessPartner->getEmail() && $dados['password'] == $BusinessPartner->getPassword())) {
            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::SUCCESS);
            $message->setText('Login efetuado com sucesso.');
            $response->addMessage($message);
        } else {
            $message = new \MilesBench\Message();
            $message->setType(\MilesBench\Message::ERROR);
            $message->setText('Usuário ou senha inválidos.');
            $response->addMessage($message);
        }
    }

}