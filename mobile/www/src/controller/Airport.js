/**
 * Created by robertomartins on 1/26/2015.
 */

    function loadAirport($component) {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            $ParentNode = document.getElementById($component)
            if ($ParentNode) {
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }            
            }

            $($component). append(
                '<option>'+'</option>'
            );

            for(var i in data.dataset){
                var Airport = data.dataset[i];
                $($component). append(
                    '<option>'+Airport.code+' '+Airport.name+'</option>'
                );
            }
            $($component).selectpicker('refresh');
        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadAirport",
            success: success
        });
    }
