/**
 * Created by robertomartins on 2/1/2015.
 */
var orderRow;
var order;

    function loadOrder() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#order");
            var $init = $('#orderTable td');
            if ($init.length > 0) {
                $('#orderTable').bootstrapTable('destroy');

                $ParentNode = document.getElementById("tb_order")
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }
            }

            for(var i in data.dataset){
                order = data.dataset[i];
                $('#orderTable tbody'). append(
                    '<tr>'+
                    '<td>'+order.id+'</td>'+
                    '<td>'+order.status+'</td>'+
                    '<td>'+order.client+'</td>'+
                    '<td>'+order.email+'</td>'+
                    '<td>'+order.phoneNumber+'</td>'+
                    '<td>'+order.airline+'</td>'+
                    '<td>'+order.from+'</td>'+
                    '<td>'+order.to+'</td>'+
                    '<td>'+order.airportNamefrom+'</td>'+
                    '<td>'+order.airportNameto+'</td>'+
                    '<td>'+numeral(order.milesUsed).format('0,0')+'</td>'+
                    '<td>'+order.description+'</td>'+
                    '<td>'+order.issueDate+'</td>'+
                    '<td>'+order.boardingDate+'</td>'+
                    '<td>'+order.flight+'</td>'+
                    '<td>'+order.flightHour+'</td>'+
                    '</tr>'
                );
            }
            var $table = $('#orderTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('click-row.bs.table', function (e, row, $element) {
                activate_page("#order_form");
                loadOrder_Form(row);
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
