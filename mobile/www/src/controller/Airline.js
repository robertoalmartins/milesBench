/**
 * Created by robertomartins on 1/26/2015.
 */

    function loadAirline($component) {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            for(var i in data.dataset){
                var Airline = data.dataset[i];
                $($component). append(
                    '<option>'+Airline.name+'</option>'
                );
            }
        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadAirline",
            success: success
        });
    }
