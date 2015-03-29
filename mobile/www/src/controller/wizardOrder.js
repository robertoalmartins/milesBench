var wizardOrderRow;
var wizard_worder_1;
var milesOrderRow;

    function loadOrderMiles_Grid() {
        $wizard_worder_1 = {};
        $wizard_worder_1['airline'] = $('#worder_airline')[0].value;
        $wizard_worder_1['milesUsed'] = $('#worder_milesUsed')[0].value;

        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#wizard_worder_2");

            $ParentNode = document.getElementById('wizardorderheader2');
            if ($ParentNode) {
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }            
            }
            $('#wizardorderheader2').append('<h2>Uai Milhas - Pedidos ('+$wizard_worder_1.milesUsed+')</h2>');

            var $init = $('#worder_milesTable td');
            if ($init.length > 0) {
                $('#worder_milesTable').bootstrapTable('destroy');

                $ParentNode = document.getElementById("tb_salesmiles")
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }
            }

            $('#worder_client').selectpicker('val','');
            $('#worder_from').selectpicker('val','');
            $('#worder_to').selectpicker('val','');
            $('#worder_pax_name').val('');
            $('#worder_registration_code').val('');
            $('#worder_birthdate').val('');
            $('#worder_description').val('');
            $('#worder_boardingDate').val('');
            $('#worder_flight').val('');
            $('#worder_flightHour').val('');

            for(var i in data.dataset){
                miles = data.dataset[i];
                $('#worder_milesTable tbody'). append(
                    '<tr>'+
                    '<td>'+miles.name+'</td>'+
                    '<td>'+miles.email+'</td>'+
                    '<td>'+miles.phoneNumber+'</td>'+
                    '<td>'+miles.airline+'</td>'+
                    '<td>'+miles.card_number+'</td>'+
                    '<td>'+numeral(miles.leftover).format('0,0')+'</td>'+
                    '<td>'+miles.due_date+'</td>'+
                    '<td>'+miles.contract_due_date+'</td>'+
                    '<td>'+numeral(miles.cost_per_thousand).format('$0,0.00')+'</td>'+
                    '</tr>'
                );
            }
            var $table = $('#worder_milesTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('click-row.bs.table', function (e, row, $element) {
                $milesOrderRow = row;
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadSalesMiles",
            data: $wizard_worder_1,
            success: success
        });
    }

    function saveWizardOrder() {
        $wizardOrderRow = {};
        $wizardOrderRow['status'] = 'Pendente';
        $wizardOrderRow['client'] = $('#worder_client')[0].value;
        $wizardOrderRow['airline'] = $wizard_worder_1['airline'];
        $wizardOrderRow['from'] = $('#worder_from')[0].value;
        $wizardOrderRow['to'] = $('#worder_to')[0].value;
        $wizardOrderRow['milesUsed'] = $wizard_worder_1['milesUsed'];
        $wizardOrderRow['paxName'] = $('#worder_pax_name')[0].value;
        $wizardOrderRow['paxRegistrationCode'] = $('#worder_registration_code')[0].value;
        $wizardOrderRow['birthdate'] = $('#worder_birthdate')[0].value;
        $wizardOrderRow['description'] = $('#worder_description')[0].value;
        $wizardOrderRow['boardingDate'] = $('#worder_boardingDate')[0].value;
        $wizardOrderRow['flight'] = $('#worder_flight')[0].value;
        $wizardOrderRow['flightHour'] = $('#worder_flightHour')[0].value;
        $wizardOrderRow['cardNumber'] = $milesOrderRow.card_number;

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            if(message['type'] == 'S') {
                alert(message['text']);
            }
            loadOrder();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/saveOrder",
            data: $wizardOrderRow,
            success: success
        });
    }

