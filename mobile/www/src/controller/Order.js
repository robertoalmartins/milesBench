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
                    '<td>'+order.milesUsed+'</td>'+
                    '<td>'+order.description+'</td>'+
                    '<td>'+order.issueDate+'</td>'+
                    '<td>'+order.boardingDate+'</td>'+
                    '<td>'+order.returnDate+'</td>'+
                    '</tr>'
                );
            }
            var $table = $('#orderTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('all.bs.table', function (e, name, args) {
                console.log('Event:', name, ', data:', args);
            }).on('click-row.bs.table', function (e, row, $element) {
                activate_page("#order_form");
                loadOrder_Form(row);
            }).on('dbl-click-row.bs.table', function (e, row, $element) {
                $result.text('Event: dbl-click-row.bs.table, data: ' + JSON.stringify(row));
            }).on('sort.bs.table', function (e, name, order) {
                $result.text('Event: sort.bs.table, data: ' + name + ', ' + order);
            }).on('check.bs.table', function (e, row) {
                $result.text('Event: check.bs.table, data: ' + JSON.stringify(row));
            }).on('uncheck.bs.table', function (e, row) {
                $result.text('Event: uncheck.bs.table, data: ' + JSON.stringify(row));
            }).on('check-all.bs.table', function (e) {
                $result.text('Event: check-all.bs.table');
            }).on('uncheck-all.bs.table', function (e) {
                $result.text('Event: uncheck-all.bs.table');
            }).on('load-success.bs.table', function (e, data) {
                $result.text('Event: load-success.bs.table');
            }).on('load-error.bs.table', function (e, status) {
                $result.text('Event: load-error.bs.table, data: ' + status);
            }).on('column-switch.bs.table', function (e, field, checked) {
                $result.text('Event: column-switch.bs.table, data: ' +
                field + ', ' + checked);
            }).on('page-change.bs.table', function (e, size, number) {
                $result.text('Event: page-change.bs.table, data: ' + number + ', ' + size);
            }).on('search.bs.table', function (e, text) {
                $result.text('Event: search.bs.table, data: ' + text);
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
        var $order_returnDate = $('#order_returnDate');

        $order_status.val(datarow.status);
        $order_client.val(datarow.client);
        $order_airline.val(datarow.airline);
        $order_from.val(datarow.from);
        $order_to.val(datarow.to);
        $order_milesUsed.val(datarow.miles_used);
        $order_description.val(datarow.description);
        $order_issueDate.val(datarow.issue_date);
        $order_boardingDate.val(datarow.boarding_date);
        $order_returnDate.val(datarow.return_date);
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
        $orderRow['returnDate'] = '';


        $('#order_status').val('Pendente');
        $('#order_client').val('');
        $('#order_airline').val('');
        $('#order_from').val('');
        $('#order_to').val('');
        $('#order_milesUsed').val('');
        $('#order_description').val('');
        $('#order_issueDate').val('');
        $('#order_boardingDate').val('');
        $('#order_returnDate').val('');
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
        $orderRow['returnDate'] = $('#order_returnDate')[0].value;

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
