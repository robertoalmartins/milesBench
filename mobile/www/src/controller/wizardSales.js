/**
 * Created by robertomartins on 2/1/2015.
 */

    function loadSalesMiles_CheckedGrid() {
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
