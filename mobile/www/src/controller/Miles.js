/**
 * Created by robertomartins on 1/19/2015.
 */
    function loadMiles() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#miles")
            var $init = $('#milesTable td');
            if ($init.length > 0) {
                $('#milesTable').bootstrapTable('destroy');

                $ParentNode = document.getElementById("tb_miles")
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }
            }

            for(var i in data.dataset){
                miles = data.dataset[i];
                $('#milesTable tbody'). append(
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
            var $table = $('#milesTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('all.bs.table', function (e, name, args) {
                console.log('Event:', name, ', data:', args);
            }).on('click-row.bs.table', function (e, row, $element) {
                console.log('Event:', name, ', data:', args);
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
            url: "../../backend/application/index.php?rota=/loadMiles",
            success: success
        });
    }

