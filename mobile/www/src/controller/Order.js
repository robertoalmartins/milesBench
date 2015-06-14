/**
 * Created by robertomartins on 2/1/2015.
 */
var orderRow;
var order;

    function loadOrder() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#order");

            var grid;
            var columns = [
                {id: "id", field: "id", name: "ID", width: 30},
                {id: "status", field: "status", name: "Status", width: 60},
                {id: "client", field: "client", name: "Agência", width: 150},
                {id: "email", field: "email", name: "Email", width: 150},
                {id: "phoneNumber", field: "phoneNumber", name: "Telefone", width: 100},
                {id: "pax", field: "pax", name: "Passageiro", width: 100},
                {id: "airline", field: "airline", name: "Companhia", width: 150},
                {id: "from", field: "from", name: "De", width: 60},
                {id: "to", field: "to", name: "Para", width: 60},
                {id: "miles_used", field: "milesUsed", name: "Total de Milhas", width: 100},
                {id: "description", field: "description", name: "Observação", width: 100},
                {id: "issue_date", field: "issueDate", name: "Data Pedido", width: 100},
                {id: "boarding_date", field: "boardingDate", name: "Data Embarque", width: 100},
                {id: "flight", field: "flight", name: "Vôo", width: 100},
                {id: "flightHour", field: "flightHour", name: "Horário Vôo", width: 100}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false
            };

            grid = new Slick.Grid("#orderTable", data.dataset, columns, options);

            grid.onClick.subscribe(function (e) {
                activate_page("#order_form");
                var cell = grid.getCellFromEvent(e);
                loadOrder_Form(grid.getData()[cell.row]);
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadOrder",
            success: success
        });
    }

    function loadOrder_Form(datarow) {
        $('#remove_order').show();
        $orderRow = datarow;

        var $order_status = $('#order_status');
        var $order_client = $('#order_client');
        var $order_airline = $('#order_airline');
        var $order_from = $('#order_from');
        var $order_to = $('#order_to');
        var $order_milesUsed = $('#order_milesUsed');
        var $order_description = $('#order_description');
        var $order_issueDate = $('#order_issueDate');
        var $order_boardingDate = $('#order_boardingDate');
        var $order_flight = $('#order_flight');
        var $order_flightHour = $('#order_flightHour');

        $order_status.selectpicker('val',datarow.status);
        $order_client.selectpicker('val',datarow.client);
        $order_airline.selectpicker('val',datarow.airline);
        $order_from.selectpicker('val',datarow.from + ' ' + datarow.airportNamefrom);
        $order_to.selectpicker('val',datarow.to + ' ' + datarow.airportNameto);
        $order_milesUsed.val(numeral().unformat(datarow.miles_used));
        $order_description.val(datarow.description);
        $order_issueDate.val(datarow.issue_date);
        $order_boardingDate.val(datarow.boarding_date);
        $order_flight.val(datarow.flight);
        $order_flightHour.val(datarow.flightHour);
    }

    function newOrder() {
        $('#remove_order').hide();
        $orderRow = {};

        $orderRow['status'] = 'Pendente';
        $orderRow['client'] = '';
        $orderRow['airline'] = '';
        $orderRow['from'] = '';
        $orderRow['to'] = '';
        $orderRow['milesUsed'] = '';
        $orderRow['description'] = '';
        $orderRow['issueDate'] = '';
        $orderRow['boardingDate'] = '';
        $orderRow['flight'] = '';
        $orderRow['flightHour'] = '';

        $('#order_status').selectpicker('val','Pendente');
        $('#order_client').selectpicker('val','');
        $('#order_airline').selectpicker('val','');
        $('#order_from').selectpicker('val','');
        $('#order_to').selectpicker('val','');
        $('#order_milesUsed').val('');
        $('#order_description').val('');
        $('#order_issueDate').val('');
        $('#order_boardingDate').val('');
        $('#order_flight').val('');
        $('#order_flightHour').val('');
    }

    function saveOrder() {
        $orderRow['status'] = $('#order_status')[0].value;
        $orderRow['client'] = $('#order_client')[0].value;
        $orderRow['airline'] = $('#order_airline')[0].value;
        $orderRow['from'] = $('#order_from')[0].value;
        $orderRow['to'] = $('#order_to')[0].value;
        $orderRow['milesUsed'] = $('#order_milesUsed')[0].value;
        $orderRow['description'] = $('#order_description')[0].value;
        $orderRow['issueDate'] = $('#order_issueDate')[0].value;
        $orderRow['boardingDate'] = $('#order_boardingDate')[0].value;
        $orderRow['flight'] = $('#order_flight')[0].value;
        $orderRow['flightHour'] = $('#order_flightHour')[0].value;

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
            data: $orderRow,
            success: success
        });
    }

    function removeOrder() {
        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            if(message['type'] == 'S') {
                alert(message['text']);
            }
            loadOrder();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/removeOrder",
            data: $orderRow,
            success: success
        });
    }
