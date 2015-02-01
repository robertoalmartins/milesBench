/**
 * Created by robertomartins on 1/19/2015.
 */
var providerRow;
var provider;

    function loadProvider() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#provider");
            var $init = $('#providerTable td');
            if ($init.length > 0) {
                $('#providerTable').bootstrapTable('destroy');

                $ParentNode = document.getElementById("tb_provider")
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }
            }

            for(var i in data.dataset){
                provider = data.dataset[i];
                $('#providerTable tbody'). append(
                    '<tr id="tr_id'+provider.id+'" class="tr-class-'+provider.id+'">'+
                    '<td id="td_id_'+provider.id+'" class="td-class-'+provider.id+'">'+provider.id+'</td>'+
                    '<td>'+provider.name+'</td>'+
                    '<td>'+provider.email+'</td>'+
                    '<td>'+provider.phoneNumber+'</td>'+
                    '<td>'+provider.registrationCode+'</td>'+
                    '<td>'+provider.adress+'</td>'+
                    '<td>'+provider.city+'</td>'+
                    '</tr>'
                );
            }
            var $table = $('#providerTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('all.bs.table', function (e, name, args) {
                console.log('Event:', name, ', data:', args);
            }).on('click-row.bs.table', function (e, row, $element) {
                activate_page("#provider_form");
                loadform(row);
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
            url: "../../backend/application/index.php?rota=/loadProvider",
            success: success
        });
    }

    function loadform(datarow) {
        $('#remove_provider').show();
        $providerRow = datarow;

        var $provider_name = $('#provider_name');
        var $provider_code = $('#provider_code');
        var $provider_adress = $('#provider_adress');
        var $provider_city = $('#provider_city');
        var $provider_email = $('#provider_email');
        var $provider_phone = $('#provider_phone');

        $provider_name.val(datarow.name);
        $provider_code.val(datarow.registrationCode);
        $provider_adress.val(datarow.adress);
        $provider_city.val(datarow.city);
        $provider_email.val(datarow.email);
        $provider_phone.val(datarow.phoneNumber);
    }

    function newProvider() {
        $('#remove_provider').hide();
        $providerRow = {};

        $providerRow['name'] = '';
        $providerRow['registrationCode'] = '';
        $providerRow['adress'] = '';
        $providerRow['city'] = '';
        $providerRow['email'] = '';
        $providerRow['phoneNumber'] = '';

        $('#provider_name').val('');
        $('#provider_code').val('');
        $('#provider_adress').val('');
        $('#provider_city').val('');
        $('#provider_email').val('');
        $('#provider_phone').val('');
    }

    function saveProvider() {
        $providerRow.name = $('#provider_name')[0].value;
        $providerRow.registrationCode = $('#provider_code')[0].value;
        $providerRow.adress = $('#provider_adress')[0].value;
        $providerRow.city = $('#provider_city')[0].value;
        $providerRow.email = $('#provider_email')[0].value;
        $providerRow.phoneNumber = $('#provider_phone')[0].value;

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            if(message['type'] == 'S') {
                alert(message['text']);
            }
            loadProvider();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/saveProvider",
            data: $providerRow,
            success: success
        });
    }

    function removeProvider() {
        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            if(message['type'] == 'S') {
                alert(message['text']);
            }
            loadProvider();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/removeProvider",
            data: $providerRow,
            success: success
        });
    }
