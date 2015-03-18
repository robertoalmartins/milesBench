/**
 * Created by robertomartins on 2/1/2015.
 */
var salesOrderRow;
var milesCardRow;
var salesRow;

    function loadSalesMiles_Order() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#wizard_sales_1");
            var $init = $('#sales1Table td');
            if ($init.length > 0) {
                $('#sales1Table').bootstrapTable('destroy');

                $ParentNode = document.getElementById("tb_sales1")
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }
            }

            for(var i in data.dataset){
                order = data.dataset[i];
                $('#sales1Table tbody'). append(
                    '<tr>'+
                    '<td>'+order.id+'</td>'+
                    '<td>'+order.status+'</td>'+
                    '<td>'+order.client+'</td>'+
                    '<td>'+order.email+'</td>'+
                    '<td>'+order.phoneNumber+'</td>'+
                    '<td>'+order.airline+'</td>'+
                    '<td>'+order.from+'</td>'+
                    '<td>'+order.to+'</td>'+
                    '<td>'+numeral(order.milesUsed).format('0,0')+'</td>'+
                    '<td>'+order.description+'</td>'+
                    '<td>'+order.issueDate+'</td>'+
                    '<td>'+order.boardingDate+'</td>'+
                    '<td>'+order.returnDate+'</td>'+
                    '</tr>'
                );
            }
            var $table = $('#sales1Table');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('click-row.bs.table', function (e, row, $element) {
                $salesOrderRow = row;
                loadSalesMiles_Grid();
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadOpenedOrder",
            success: success
        });
    }

    function loadSalesMiles_Grid() {
        $milesUsed = {};
        $milesUsed['value'] = numeral().unformat($salesOrderRow.miles_used);

        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#wizard_sales_2");

            $ParentNode = document.getElementById('wizardheader2');
            if ($ParentNode) {
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }            
            }
            $('#wizardheader2').append('<h2>Uai Milhas - Registrar Emissão ('+$salesOrderRow.miles_used+')</h2>');

            var $init = $('#sales_milesTable td');
            if ($init.length > 0) {
                $('#sales_milesTable').bootstrapTable('destroy');

                $ParentNode = document.getElementById("tb_salesmiles")
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }
            }

            for(var i in data.dataset){
                miles = data.dataset[i];
                $('#sales_milesTable tbody'). append(
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
            var $table = $('#sales_milesTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('click-row.bs.table', function (e, row, $element) {
                $milesCardRow = row;
                loadSalesWizard_Form();
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadSalesMiles",
            data: $milesUsed,
            success: success
        });
    }

    function loadSalesWizard_Form() {
        activate_page("#wizard_sales_3");

        $ParentNode = document.getElementById('wizardheader3');
        if ($ParentNode) {
            while ($ParentNode.hasChildNodes()) {
                $ParentNode.removeChild($ParentNode.firstChild);
            }            
        }
        $('#wizardheader3').append('<h2>Uai Milhas - Registrar Emissão ('+$milesCardRow.name+')</h2>');


        var $sales_miles_used = $('#sales_miles_used');
        var $sales_total_cost = $('#sales_total_cost');
        $sales_miles_used.val(numeral().unformat($salesOrderRow.miles_used));
        $sales_total_cost.val(numeral().unformat($milesCardRow.cost_per_thousand)/1000 * numeral().unformat($salesOrderRow.miles_used));
    }

    function setKickback(){
        $('#sales_kickback').val($('#sales_amount_paid')[0].value - $('#sales_total_cost')[0].value - $('#sales_tax')[0].value - $('#sales_extra_fee')[0].value);
    }

    function saveSale(){
        $salesRow = {};
        $salesRow['id'] = $salesOrderRow.id;
        $salesRow['cardNumber'] = $milesCardRow.card_number;
        $salesRow['dueDate'] = $milesCardRow.due_date;
        $salesRow['paxName'] = $('#sales_pax_name')[0].value;
        $salesRow['paxRegistrationCode'] = $('#sales_registration_code')[0].value;
        $salesRow['flightLocator'] = $('#sales_flight_locator')[0].value;
        $salesRow['checkinState'] = $('#sales_checkin_state')[0].value;
        $salesRow['tax'] = $('#sales_tax')[0].value;
        $salesRow['milesUsed'] = $('#sales_miles_used')[0].value;
        $salesRow['totalCost'] = $('#sales_total_cost')[0].value;
        $salesRow['amountPaid'] = $('#sales_amount_paid')[0].value;
        $salesRow['kickback'] = $('#sales_kickback')[0].value;
        $salesRow['extra_fee'] = $('#sales_extra_fee')[0].value;
        $salesRow['birthdate'] = $('#sales_birthdate')[0].value;

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            if(message['type'] == 'S') {
                alert(message['text']);
            }
            loadClient('#order_client');
            loadAirport('#order_from');
            loadAirport('#order_to');
            loadAirline('#order_airline');
            loadOrder();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/saveSale",
            data: $salesRow,
            success: success
        });
    }