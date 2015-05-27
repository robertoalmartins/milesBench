/**
 * Created by robertomartins on 1/19/2015.
 */
var providerRow;
var provider;

    function loadProvider() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#provider");

            var columns = [
                {id: "id", field: "id", name: "ID", width: 20}, 
                {id: "name", field: "name", name: "Nome", width: 200}, 
                {id: "email", field: "email", name: "Email", width: 150}, 
                {id: "phoneNumber", field: "phoneNumber", name: "Telefone Celular", width: 100}, 
                {id: "phoneNumber2", field: "phoneNumber2", name: "Telefone Comercial", width: 100}, 
                {id: "phoneNumber3", field: "phoneNumber3", name: "Telefone Residencial", width: 100}, 
                {id: "registrationCode", field: "registrationCode", name: "CPF", width: 100}, 
                {id: "adress", field: "adress", name: "Endereço", width: 120}, 
                {id: "city", field: "city", name: "Cidade", width: 120}, 
                {id: "edit", name: "Editar", field: "src", width: 40, formatter: function(args) {return "<img id='profileedit'   src ='img/edit.png'></img>"}}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false
            };

            grid = new Slick.Grid("#providerTable", data.dataset, columns, options);

            grid.onClick.subscribe(function (e) {
                activate_page("#provider_form");
                var cell = grid.getCellFromEvent(e);
                Providerloadform(grid.getData()[cell.row]);
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
        $providerRow['state'] = '';
        $providerRow['email'] = '';
        $providerRow['phoneNumber'] = '';
        $providerRow['phoneNumber2'] = '';
        $providerRow['phoneNumber3'] = '';
        $providerRow['status'] = 'Em Analise';
        $providerRow['partnerType'] = 'P';

        $('#provider_name').val('');
        $('#provider_code').val('');
        $('#provider_adress').val('');
        $('#provider_city').selectpicker('val','');
        $('#provider_state').selectpicker('val','');
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
        $providerRow.city = $('#provider_city')[0].value;
        $providerRow.state = $('#provider_state')[0].value;
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
