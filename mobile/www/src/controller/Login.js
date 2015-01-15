/**
 * Created by robertomartins on 1/14/2015.
 */
function login() {
    var success = function(response) {
        var message = jQuery.parseJSON(response).message;
        alert(message['text']);
        if(message['type'] == 'S') {
            activate_page("#mb_mainpage")
        }
    };

    $.ajax({
        type: "POST",
        url: "../../backend/application/index.php?rota=/login",
        data: getFormData($('.form-signin')),
        success: success
    });
}
