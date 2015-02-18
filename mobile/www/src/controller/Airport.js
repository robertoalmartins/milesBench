/**
 * Created by robertomartins on 1/26/2015.
 */

    function loadAirport($component) {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            for(var i in data.dataset){
                var Airport = data.dataset[i];
                $($component). append(
                    '<option>'+Airport.code+'</option>'
                );
            }
        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadAirport",
            success: success
        });
    }
