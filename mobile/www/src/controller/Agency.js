/**
 * Created by robertomartins on 1/19/2015.
 */
var agencyRow;
var agency;

    function loadAgency() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#agency");

            var columns = [
                {id: "id", field: "id", name: "ID", width: 20},
                {id: "name", field: "name", name: "Nome", width: 200},
                {id: "email", field: "email", name: "Email", width: 150},
                {id: "phoneNumber", field: "phoneNumber", name: "Telefone Celular", width: 100},
                {id: "phoneNumber2", field: "phoneNumber2", name: "Telefone Comercial", width: 100},
                {id: "phoneNumber3", field: "phoneNumber3", name: "Fax", width: 100},
                {id: "registrationCode", field: "registrationCode", name: "CNPJ", width: 100},
                {id: "adress", field: "adress", name: "Endereço", width: 120},
                {id: "city", field: "city", name: "Cidade", width: 120},
                {id: "edit", name: "Editar", field: "src", width: 40, formatter: function(args) {return "<img id='profileedit'   src ='img/edit.png'></img>"}}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false
            };

            grid = new Slick.Grid("#agencyTable", data.dataset, columns, options);

            grid.onClick.subscribe(function (e) {
                activate_page("#agency_form");
                var cell = grid.getCellFromEvent(e);
                Agencyloadform(grid.getData()[cell.row]);
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadClient",
            success: success
        });
    }

    function Agencyloadform(datarow) {
        $('#remove_agency').show();
        $agencyRow = datarow;

        var $agency_name = $('#agency_name');
        var $agency_code = $('#agency_code');
        var $agency_adress = $('#agency_adress');
        var $agency_city = $('#agency_city');
        var $agency_state = $('#agency_state');
        var $agency_email = $('#agency_email');
        var $agency_phone = $('#agency_phone');
        var $agency_phone2 = $('#agency_phone2');
        var $agency_phone3 = $('#agency_phone3');

        $agency_name.val(datarow.name);
        $agency_code.val(datarow.registrationCode);
        $agency_adress.val(datarow.adress);
        $agency_email.val(datarow.email);
        $agency_phone.val(datarow.phoneNumber);
        $agency_phone2.val(datarow.phoneNumber2);
        $agency_phone3.val(datarow.phoneNumber3);

        var str = datarow.city;

        setCityNameEnviroment(str.substring(0,str.indexOf(',')));
        $agency_state.selectpicker('val',str.substring(str.indexOf(',')+2));
        loadCity('agency_city','agency_state');
    }

    function newAgency() {
        $('#remove_agency').hide();
        $agencyRow = {};

        $agencyRow['name'] = '';
        $agencyRow['registrationCode'] = '';
        $agencyRow['adress'] = '';
        $agencyRow['city'] = '';
        $agencyRow['state'] = '';
        $agencyRow['email'] = '';
        $agencyRow['phoneNumber'] = '';
        $agencyRow['phoneNumber2'] = '';
        $agencyRow['phoneNumber3'] = '';
        $agencyRow['partnerType'] = 'C';

        $('#agency_name').val('');
        $('#agency_code').val('');
        $('#agency_adress').val('');
        $('#agency_city').selectpicker('val','');
        $('#agency_state').selectpicker('val','');
        $('#agency_email').val('');
        $('#agency_phone').val('');
        $('#agency_phone2').val('');
        $('#agency_phone3').val('');
    }

    function saveAgency() {
        $agencyRow.name = $('#agency_name')[0].value;
        $agencyRow.registrationCode = $('#agency_code')[0].value;
        $agencyRow.adress = $('#agency_adress')[0].value;
        $agencyRow.city = $('#agency_city')[0].value;
        $agencyRow.state = $('#agency_state')[0].value;
        $agencyRow.email = $('#agency_email')[0].value;
        $agencyRow.phoneNumber = $('#agency_phone')[0].value;
        $agencyRow.phoneNumber2 = $('#agency_phone2')[0].value;
        $agencyRow.phoneNumber3 = $('#agency_phone3')[0].value;
        $agencyRow.partnerType = 'C';

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            if(message['type'] == 'S') {
                alert(message['text']);
            }
            loadAgency();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/saveClient",
            data: $agencyRow,
            success: success
        });
    }

    function removeAgency() {
        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            if(message['type'] == 'S') {
                alert(message['text']);
            }
            loadAgency();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/removeClient",
            data: $agencyRow,
            success: success
        });
    }


    function loadSelectAgency($component) {
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
                var agency = data.dataset[i];
                $($component). append(
                    '<option>'+agency.name+'</option>'
                );
            }
            $($component).selectpicker('refresh');
        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadClient",
            success: success
        });
    }

    function checkCNPJAgency() {
        if (!ValidaCNPJ($('#agency_code')[0].value)){
            alert('CNPJ Inválido');
            return false;
        }
    }
