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
                    '<td>'+provider.phoneNumber2+'</td>'+
                    '<td>'+provider.phoneNumber3+'</td>'+
                    '<td>'+provider.status+'</td>'+
                    '<td>'+provider.registrationCode+'</td>'+
                    '<td>'+provider.adress+'</td>'+
                    '<td>'+provider.city+'</td>'+
                    '</tr>'
                );
            }
            var $table = $('#providerTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('click-row.bs.table', function (e, row, $element) {
                activate_page("#provider_form");
                Providerloadform(row);
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadProvider",
            success: success
        });
    }

    function Providerloadform(datarow) {
        $('#remove_provider').show();
        $providerRow = datarow;

        var $provider_name = $('#provider_name');
        var $provider_code = $('#provider_code');
        var $provider_adress = $('#provider_adress');
        var $provider_city = $('#provider_city');
        var $provider_state = $('#provider_state');
        var $provider_email = $('#provider_email');
        var $provider_phone = $('#provider_phone');
        var $provider_phone2 = $('#provider_phone2');
        var $provider_phone3 = $('#provider_phone3');
        var $provider_status = $('#provider_status');

        $provider_name.val(datarow.name);
        $provider_code.val(datarow.registrationCode);
        $provider_adress.val(datarow.adress);
        $provider_email.val(datarow.email);
        $provider_phone.val(datarow.phoneNumber);
        $provider_phone2.val(datarow.phoneNumber2);
        $provider_phone3.val(datarow.phoneNumber3);
        $provider_status.val(datarow.status);

        var str = datarow.city;

        setCityNameEnviroment(str.substring(0,str.indexOf(',')));
        $provider_state.selectpicker('val',str.substring(str.indexOf(',')+2));
        loadCity('provider_city','provider_state');
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
        $providerRow['phoneNumber2'] = '';
        $providerRow['phoneNumber3'] = '';
        $providerRow['status'] = 'Em Analise';
        $providerRow['partnerType'] = 'P';

        $('#provider_name').val('');
        $('#provider_code').val('');
        $('#provider_adress').val('');
        $('#provider_city').val('');
        $('#provider_state').val('');
        $('#provider_email').val('');
        $('#provider_phone').val('');
        $('#provider_phone2').val('');
        $('#provider_phone3').val('');
        $('#provider_status').val('');
    }

    function saveProvider() {
        $providerRow.name = $('#provider_name')[0].value;
        $providerRow.registrationCode = $('#provider_code')[0].value;
        $providerRow.adress = $('#provider_adress')[0].value;
        $providerRow.city = $('#provider_city')[0].value + ', ' + $('#provider_state')[0].value;
        $providerRow.email = $('#provider_email')[0].value;
        $providerRow.phoneNumber = $('#provider_phone')[0].value;
        $providerRow.phoneNumber2 = $('#provider_phone2')[0].value;
        $providerRow.phoneNumber3 = $('#provider_phone3')[0].value;
        $providerRow.status = $('#provider_status')[0].value;
        $providerRow.partnerType = 'P';

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


    function loadSelectProvider($component) {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            str = $component;
            $ParentNode = document.getElementById(str.substr(1,100));
            if ($ParentNode) {
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }            
            }

            $($component). append(
                '<option>'+'</option>'
            );
            for(var i in data.dataset){
                var provider = data.dataset[i];
                $($component). append(
                    '<option>'+provider.name+'</option>'
                );
            }
            $($component).selectpicker('refresh');
        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadProvider",
            success: success
        });
    }

    function checkCPFProvider() {
        if (!ValidaCPF($('#provider_code')[0].value)){
            alert('CPF Inválido');
            return false;
        }
    }
