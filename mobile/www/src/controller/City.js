/**
 * Created by robertomartins on 1/26/2015.
 */

    function loadCity($component, $componentState, $value) {
        $data = {};
        $data.state = $('#'+$componentState)[0].value;
        $('#'+$component).val('');

        var success = function(response) {
            var data = jQuery.parseJSON(response);

            $ParentNode = document.getElementById($component)
            while ($ParentNode.hasChildNodes()) {
                $ParentNode.removeChild($ParentNode.firstChild);
            }            

            for(var i in data.dataset){
                var city = data.dataset[i];
                $('#'+$component). append(
                    '<option>'+city.name+'</option>'
                );
            }
            $('#'+$component).selectpicker('refresh');
            if ($value) {
                $('#'+$component).selectpicker('val',$value);                
            }
        }

        $.ajax({
            type: "POST",
            data: $data,
            url: "../../backend/application/index.php?rota=/loadCity",
            success: success
        });
    }

    function loadState($component) {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            for(var i in data.dataset){
                var city = data.dataset[i];
                $($component). append(
                    '<option>'+city.state+'</option>'
                );
            }
            $($component).selectpicker('refresh');

        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadState",
            success: success
        });
    }
