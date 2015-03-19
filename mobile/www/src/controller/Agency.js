/**
 * Created by robertomartins on 1/19/2015.
 */
var agencyRow;
var agency;

    function loadAgency() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#agency");
            var $init = $('#agencyTable td');
            if ($init.length > 0) {
                $('#agencyTable').bootstrapTable('destroy');

                $ParentNode = document.getElementById("tb_agency")
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }
            }

            for(var i in data.dataset){
                agency = data.dataset[i];
                $('#agencyTable tbody'). append(
                    '<tr id="tr_id'+agency.id+'" class="tr-class-'+agency.id+'">'+
                    '<td id="td_id_'+agency.id+'" class="td-class-'+agency.id+'">'+agency.id+'</td>'+
                    '<td>'+agency.name+'</td>'+
                    '<td>'+agency.email+'</td>'+
                    '<td>'+agency.phoneNumber+'</td>'+
                    '<td>'+agency.phoneNumber2+'</td>'+
                    '<td>'+agency.phoneNumber3+'</td>'+
                    '<td>'+agency.registrationCode+'</td>'+
                    '<td>'+agency.adress+'</td>'+
                    '<td>'+agency.city+'</td>'+
                    '</tr>'
                );
            }
            var $table = $('#agencyTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('click-row.bs.table', function (e, row, $element) {
                activate_page("#agency_form");
                Agencyloadform(row);
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
