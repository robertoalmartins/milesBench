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
                    '<td>'+order.milesUsed+'</td>'+
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
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#wizard_sales_2");
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
                    '<td>'+miles.leftover+'</td>'+
                    '<td>'+miles.due_date+'</td>'+
                    '<td>'+miles.cost_per_thousand+'</td>'+
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
            url: "../../backend/application/index.php?rota=/loadMiles",
            success: success
        });
    }

    function loadSalesWizard_Form() {
        activate_page("#wizard_sales_3");
        var $sales_miles_used = $('#sales_miles_used');
        var $sales_total_cost = $('#sales_total_cost');
        $sales_miles_used.val($salesOrderRow.miles_used);
        $sales_total_cost.val($milesCardRow.cost_per_thousand/1000 * $salesOrderRow.miles_used);
    }

    function setKickback(){
        $('#sales_kickback').val($('#sales_amount_paid')[0].value - $('#sales_total_cost')[0].value - $('#sales_tax')[0].value);
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

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            if(message['type'] == 'S') {
                alert(message['text']);
            }
            loadOrder();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/saveSale",
            data: $salesRow,
            success: success
        });
    }