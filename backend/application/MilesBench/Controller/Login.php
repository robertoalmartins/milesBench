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

        $conn = Application::getInstance()->getConnectionManager();
        $BusinessPartner = $conn->query('select password from businesspartner where email = '.$dados['email']);

        if($dados['email'] == 'admin' && $dados['senha'] == '123') {
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