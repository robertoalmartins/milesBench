/**
 * Created by robertomartins on 2/1/2015.
 */
var new_provider;

    function loadFormProvider($component) {
        if ($('#wizard_selectprovider')[0].value == '') {
            loadCity('#provider_city');
            activate_page("#wizard_purchase_2");
            $Node = document.getElementById("provider_formsub").childNodes;
            $('#wizard_purchase_2sub').append($Node);
            new_provider = true;
        } else {
            activate_page("#wizard_purchase_3");
            new_provider = false;
        }
    }
