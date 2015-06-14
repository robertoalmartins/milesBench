/**
 * Created by robertomartins on 1/19/2015.
 */
var profileRow;
var profile;

    function loadProfile() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#profile");

            var grid;
            var columns = [
                {id: "id", name: "ID", field: "id", width: 20},
                {id: "name", name: "Nome", field: "name", width: 200},
                {id: "email", name: "Email", field: "email", width: 150},
                {id: "phoneNumber", name: "Telefone Celular", field: "phoneNumber", width: 100},
                {id: "phoneNumber2", name: "Telefone Comercial", field: "phoneNumber2", width: 100},
                {id: "phoneNumber3", name: "Fax", field: "phoneNumber3", width: 100},
                {id: "registrationCode", name: "CPF", field: "registrationCode", width: 100},
                {id: "adress", name: "Endereço", field: "adress", width: 120},
                {id: "city", name: "Cidade", field: "city", width: 120},
                {id: "edit", name: "Editar", field: "src", width: 40, formatter: function(args) {return "<img id='profileedit'   src ='img/edit.png'></img>"}}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false
            };

            grid = new Slick.Grid("#profileTable", data.dataset, columns, options);

            grid.onClick.subscribe(function (e) {
                activate_page("#profile_form");
                var cell = grid.getCellFromEvent(e);
                Profileloadform(grid.getData()[cell.row]);
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadProfile",
            success: success
        });
    }

    function Profileloadform(datarow) {
        $('#remove_profile').show();
        $profileRow = datarow;

        var $profile_name = $('#profile_name');
        var $profile_code = $('#profile_code');
        var $profile_adress = $('#profile_adress');
        var $profile_city = $('#profile_city');
        var $profile_state = $('#profile_state');
        var $profile_email = $('#profile_email');
        var $profile_phone = $('#profile_phone');
        var $profile_phone2 = $('#profile_phone2');
        var $profile_phone3 = $('#profile_phone3');
        var $profile_password = $('#profile_password');

        $profile_name.val(datarow.name);
        $profile_code.val(datarow.registrationCode);
        $profile_adress.val(datarow.adress);
        $profile_email.val(datarow.email);
        $profile_phone.val(datarow.phoneNumber);
        $profile_phone2.val(datarow.phoneNumber2);
        $profile_phone3.val(datarow.phoneNumber3);
        $profile_password.val(datarow.password);

        var str = datarow.city;

        setCityNameEnviroment(str.substring(0,str.indexOf(',')));
        $profile_state.selectpicker('val',str.substring(str.indexOf(',')+2));
        loadCity('profile_city','profile_state');
    }

    function newProfile() {
        $('#remove_profile').hide();
        $profileRow = {};

        $profileRow['name'] = '';
        $profileRow['registrationCode'] = '';
        $profileRow['adress'] = '';
        $profileRow['city'] = '';
        $profileRow['state'] = '';
        $profileRow['email'] = '';
        $profileRow['phoneNumber'] = '';
        $profileRow['phoneNumber2'] = '';
        $profileRow['phoneNumber3'] = '';
        $profileRow['password'] = '';
        $profileRow['partnerType'] = 'U';

        $('#profile_name').val('');
        $('#profile_code').val('');
        $('#profile_adress').val('');
        $('#profile_city').selectpicker('val','');
        $('#profile_state').selectpicker('val','');
        $('#profile_email').val('');
        $('#profile_phone').val('');
        $('#profile_phone2').val('');
        $('#profile_phone3').val('');
        $('#profile_password').val('');
    }

    function saveProfile() {
        $profileRow.name = $('#profile_name')[0].value;
        $profileRow.registrationCode = $('#profile_code')[0].value;
        $profileRow.adress = $('#profile_adress')[0].value;
        $profileRow.city = $('#profile_city')[0].value;
        $profileRow.state = $('#profile_state')[0].value;
        $profileRow.email = $('#profile_email')[0].value;
        $profileRow.phoneNumber = $('#profile_phone')[0].value;
        $profileRow.phoneNumber2 = $('#profile_phone2')[0].value;
        $profileRow.phoneNumber3 = $('#profile_phone3')[0].value;
        $profileRow.password = $('#profile_password')[0].value;
        $profileRow.partnerType = 'U';

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            alert(message['text']);
            loadProfile();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/saveProfile",
            data: $profileRow,
            success: success
        });
    }

    function removeProfile() {
        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            alert(message['text']);
            loadProfile();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/removeProfile",
            data: $profileRow,
            success: success
        });
    }


    function loadSelectProfile($component) {
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
                var profile = data.dataset[i];
                $($component). append(
                    '<option>'+profile.name+'</option>'
                );
            }
            $($component).selectpicker('refresh');
        }

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadProfile",
            success: success
        });
    }

    function checkCPFProfile() {
        if (!ValidaCPF($('#profile_code')[0].value)){
            alert('CPF Inválido');
            return false;
        }
    }
