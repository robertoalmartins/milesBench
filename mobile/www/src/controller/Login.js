/**
 * Created by robertomartins on 1/14/2015.
 */
function login() {
    var success = function(response) {
        var message = jQuery.parseJSON(response).message;
        if(message['type'] == 'S') {
            activate_page("#mb_mainpage")
        } else {
            alert('Usuário ou senha inválidos')
        }
    };

    $.ajax({
        type: "POST",
        url: "../../backend/application/index.php?rota=/login",
        data: getFormData($('.form-signin')),
        success: success
    });
}
