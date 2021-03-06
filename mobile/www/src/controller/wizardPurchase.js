/**
 * Created by robertomartins on 2/1/2015.
 */
var new_provider;
var wizard_provider;
var wizard_purchase;
var wizard_purchase_data;

    function loadFormProvider($component) {
        $wizard_provider = {};
        $wizard_purchase = {};
        $wizard_purchase_data = {};

        if ($('#wizard_selectprovider')[0].value == '') {
            loadState('#provider_state');
            activate_page("#wizard_purchase_2");
            
            $Node = document.getElementById("provider_formsub").childNodes;
            $('#wizard_purchase_2sub').append($Node);
            
            new_provider = true;
        } else {
            $wizard_provider.name = $('#wizard_selectprovider')[0].value;
            new_provider = false;
            activate_page("#wizard_purchase_3");
        }
    }

    function clearFieldValues() {
        $('#wizard_selectprovider').selectpicker('val','');
        $('#provider_name').val('');
        $('#provider_code').val('');
        $('#provider_adress').val('');
        $('#provider_city').selectpicker('val','');
        $('#provider_state').selectpicker('val','');
        $('#provider_email').val('');
        $('#provider_phone').val('');
        $('#provider_status').selectpicker('val','Em Analise');
        
        $('#purchase_cost_per_thousand').val('');
        $("#purchase_totalcost").val('');
        $('#purchase_miles').val('');
        $('#purchase_airline').selectpicker('val','');
        $('#purchase_description').val('');
        $('#purchase_card_number').val('');
        $('#purchase_access_id').val('');
        $('#purchase_access_password').val('');
        $('#purchase_recovery_password').val('');
        $("#purchase_miles_duedate").val('');
        $("#purchase_contract_miles_duedate").val('');        
    }

    function savelocal_provider() {
        $wizard_provider.id = 'new';
        $wizard_provider.name = $('#provider_name')[0].value;
        $wizard_provider.status = $('#provider_status')[0].value;
        $wizard_provider.registrationCode = $('#provider_code')[0].value;
        $wizard_provider.adress = $('#provider_adress')[0].value;
        $wizard_provider.city = $('#provider_city')[0].value;
        $wizard_provider.email = $('#provider_email')[0].value;
        $wizard_provider.phoneNumber = $('#provider_phone')[0].value;
        $wizard_provider.partnerType = 'P';
    }

    function setFieldsVisibility($value) {
        if ($value == 'TAM') {
            document.getElementById("div_access_id").style.visibility = "visible";
            document.getElementById("div_access_password").style.visibility = "visible";
        } else {
            document.getElementById("div_access_id").style.visibility = "collapse";
            document.getElementById("div_access_password").style.visibility = "collapse";
        }
    }

    function loadCard() {
        $cards = {};
        $cards.registrationCode = $wizard_provider.registrationCode;
        $cards.name = $wizard_provider.name;
        $cards.airline = $wizard_purchase.airline;

        var success = function(response) {
            var data = jQuery.parseJSON(response);

            $('#purchase_card_number').val(data.dataset[0].card_number);
            $('#purchase_access_id').val(data.dataset[0].access_id);
            $('#purchase_access_password').val(data.dataset[0].access_password);
            $('#purchase_recovery_password').val(data.dataset[0].recovery_password);
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadProviderAirlineCard",
            success: success,
            data: $cards
        });        
    }

    function setTotalCost(){
        $("#purchase_totalcost").val($('#purchase_cost_per_thousand')[0].value/1000 * $('#purchase_miles')[0].value);
    }

    function savelocal_purchase() {
        $wizard_purchase.miles_due_date = $("#purchase_miles_duedate")[0].value;
        $wizard_purchase.miles_contract_due_date = $("#purchase_contract_miles_duedate")[0].value;
        $wizard_purchase.miles = $("#purchase_miles")[0].value;
        $wizard_purchase.cost_per_thousand = $("#purchase_cost_per_thousand")[0].value;
        $wizard_purchase.total_cost = $("#purchase_totalcost")[0].value;
        $wizard_purchase.airline = $('#purchase_airline')[0].value;
        $wizard_purchase.description = $('#purchase_description')[0].value;
        
        setFieldsVisibility($('#purchase_airline')[0].value);
    }

    function saveserver_wizard() {
        $wizard_purchase_data.id = $wizard_provider.id;
        $wizard_purchase_data.name = $wizard_provider.name;
        $wizard_purchase_data.status = $wizard_provider.status;
        $wizard_purchase_data.registrationCode = $wizard_provider.registrationCode;
        $wizard_purchase_data.adress = $wizard_provider.adress;
        $wizard_purchase_data.city = $wizard_provider.city;
        $wizard_purchase_data.email = $wizard_provider.email;
        $wizard_purchase_data.phoneNumber = $wizard_provider.phoneNumber;
        $wizard_purchase_data.partnerType = $wizard_provider.partnerType;
        $wizard_purchase_data.miles_due_date = $wizard_purchase.miles_due_date;
        $wizard_purchase_data.purchase_miles = $wizard_purchase.miles;
        $wizard_purchase_data.cost_per_thousand = $wizard_purchase.cost_per_thousand;
        $wizard_purchase_data.total_cost = $wizard_purchase.total_cost;
        $wizard_purchase_data.airline = $wizard_purchase.airline;
        $wizard_purchase_data.description = $wizard_purchase.description;
        $wizard_purchase_data.card_number = $('#purchase_card_number')[0].value;
        $wizard_purchase_data.access_id = $('#purchase_access_id')[0].value;
        $wizard_purchase_data.access_password = $('#purchase_access_password')[0].value;
        $wizard_purchase_data.recovery_password = $('#purchase_recovery_password')[0].value;

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            alert(message['text']);
            loadMiles();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/savePurchase",
            data: $wizard_purchase_data,
            success: success
        });
    }