/**
 * Created by robertomartins on 1/26/2015.
 */

    function loadClient($component) {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            for(var i in data.dataset){
                var city = data.dataset[i];
                $($component). append(
                    '<option>'+city.name+'</option>'
                );
            }
        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadClient",
            success: success
        });
    }
