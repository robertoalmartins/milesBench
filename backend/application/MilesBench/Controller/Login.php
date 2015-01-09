<?php
namespace MilesBench\Controller;

use \MilesBench\Request\Request;
use \MilesBench\Request\Response;

/**
 * Description of Pedido
 *
 * @author tulio
 */
class Login {

    public function login(Request $request, Response $response) {
        $dados = $request->getRow();
        
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