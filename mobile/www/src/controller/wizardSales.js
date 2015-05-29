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

            var grid;
            var columns = [
                {id: "id", field: "id", name: "ID", width: 20},
                {id: "status", field: "status", name: "Status", width: 60},
                {id: "client", field: "client", name: "Agência", width: 100},
                {id: "email", field: "email", name: "Email", width: 150},
                {id: "phoneNumber", field: "phoneNumber", name: "Telefone", width: 100},
                {id: "pax", field: "pax", name: "Nome do Passageiro", width: 100},
                {id: "airline", field: "airline", name: "Companhia", width: 60},
                {id: "from", field: "from", name: "De", width: 60},
                {id: "to", field: "to", name: "Para", width: 60},
                {id: "miles_used", field: "milesUsed", name: "Total de Milhas", width: 100},
                {id: "description", field: "description", name: "Observação", width: 100},
                {id: "issue_date", field: "issueDate", name: "Data Pedido", width: 100},
                {id: "boarding_date", field: "boardingDate", name: "Data Embarque", width: 100},
                {id: "return_date", field: "returnDate", name: "Data Retorno", width: 100},
                {id: "cards", field: "cards", name: "ID Cartão", width: 100}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false
            };

            grid = new Slick.Grid("#sales1Table", data.dataset, columns, options);

            grid.onClick.subscribe(function (e) {
                var cell = grid.getCellFromEvent(e);
                $salesOrderRow = grid.getData()[cell.row];
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
        $milesUsed['value'] = numeral().unformat($salesOrderRow.milesUsed);
        $milesUsed['cards'] = $salesOrderRow.cards;


        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#wizard_sales_2");

            $ParentNode = document.getElementById('wizardheader2');
            if ($ParentNode) {
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }            
            }
            $('#wizardheader2').append('<h2>Uai Milhas - Registrar Emissão ('+$salesOrderRow.milesUsed+')</h2>');

            var grid;
            var columns = [
                {id: "name", field: "name", name: "Nome", width: 200},
                {id: "email", field: "email", name: "Email", width: 150},
                {id: "phoneNumber", field: "phoneNumber", name: "Telefone", width: 100},
                {id: "airline", field: "airline", name: "Companhia", width: 60},
                {id: "card_number", field: "card_number", name: "Número Cartão", width: 100},
                {id: "leftover", field: "leftover", name: "Saldo Milhas", width: 100},
                {id: "due_date", field: "due_date", name: "Vencimento", width: 100},
                {id: "due_date", field: "due_date", name: "Limite Contrato", width: 100},
                {id: "cost_per_thousand", field: "cost_per_thousand", name: "Custo por 1000", width: 100}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false
            };

            grid = new Slick.Grid("#sales_milesTable", data.dataset, columns, options);

            grid.onClick.subscribe(function (e) {
                var cell = grid.getCellFromEvent(e);
                $milesCardRow = grid.getData()[cell.row];
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

        $('#sales_flight_locator').val('');
        $('#sales_checkin_state').val('');
        $('#sales_tax').val('');
        $('#sales_miles_used').val('');
        $('#sales_total_cost').val('');
        $('#sales_amount_paid').val('');
        $('#sales_kickback').val('');
        $('#sales_extra_fee').val('');
        
        $ParentNode = document.getElementById('wizardheader3');
        if ($ParentNode) {
            while ($ParentNode.hasChildNodes()) {
                $ParentNode.removeChild($ParentNode.firstChild);
            }            
        }
        $('#wizardheader3').append('<h2>Uai Milhas - Registrar Emissão ('+$milesCardRow.name+')</h2>');


        var $sales_miles_used = $('#sales_miles_used');
        var $sales_total_cost = $('#sales_total_cost');
        $sales_miles_used.val(numeral().unformat($salesOrderRow.milesUsed));
        $sales_total_cost.val(numeral().unformat($milesCardRow.cost_per_thousand)/1000 * numeral().unformat($salesOrderRow.milesUsed));
    }

    function setKickback(){
        $kickback = $('#sales_amount_paid')[0].value - $('#sales_total_cost')[0].value - $('#sales_tax')[0].value - $('#sales_extra_fee')[0].value;
        $kickback = Math.round($kickback * 100)/100;
        $('#sales_kickback').val($kickback);
    }

    function saveSale(){
        $salesRow = {};
        $salesRow['id'] = $salesOrderRow.id;
        $salesRow['flightLocator'] = $('#sales_flight_locator')[0].value;
        $salesRow['checkinState'] = $('#sales_checkin_state')[0].value;
        $salesRow['tax'] = $('#sales_tax')[0].value;
        $salesRow['milesUsed'] = $('#sales_miles_used')[0].value;
        $salesRow['cardNumber'] = $milesCardRow.card_number;
        $salesRow['totalCost'] = $('#sales_total_cost')[0].value;
        $salesRow['amountPaid'] = $('#sales_amount_paid')[0].value;
        $salesRow['kickback'] = $('#sales_kickback')[0].value;
        $salesRow['extra_fee'] = $('#sales_extra_fee')[0].value;

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