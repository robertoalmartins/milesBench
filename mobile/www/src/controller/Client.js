/**
 * Created by robertomartins on 1/26/2015.
 */

    function loadClient($component) {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            str = $component;
            $ParentNode = document.getElementById(str.substr(1,100));
            if ($ParentNode) {
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }            
            }

            for(var i in data.dataset){
                var city = data.dataset[i];
                $($component). append(
                    '<option>'+city.name+'</option>'
                );
            }
            $($component).selectpicker('refresh');
        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadClient",
            success: success
        });
    }
