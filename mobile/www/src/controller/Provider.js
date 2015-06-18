/**
 * Created by robertomartins on 1/19/2015.
 */
var providerRow;
var cardsRow;
var provider;
var providerFilter;

    function loadProvider() {
        if (typeof($providerFilter) == 'undefined') {
            $providerFilter = {};
        }

        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#provider");

            var columns = [
                {id: "id", field: "id", name: "ID", width: 40}, 
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
                enableColumnReorder: false,
                multiColumnSort: true
            };

            grid = new Slick.Grid("#providerTable", data.dataset, columns, options);

            grid.onClick.subscribe(function (e) {
                var cell = grid.getCellFromEvent(e);
                if (cell.cell < 9) {
                    loadProviderCards(grid.getData()[cell.row]);
                } else {
                    activate_page("#provider_form");
                    Providerloadform(grid.getData()[cell.row]);
                }
            });

            //These 2 lines will sort you data & update glyph while loading grid     
            //columnField is field of column you want to sort initially, isAsc - true/false
            gridSorter('name', true, grid, data.dataset);

            //I had the columnField, columnId same else used columnId below
            grid.setSortColumn('name', true); 

            grid.onSort.subscribe(function(e, args) {
                gridSorter(args.sortCol.field, args.sortAsc, grid, gridData);
            });
            loadProviderCards(data.dataset[0]);
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadProvider",
            success: success,
            data: $providerFilter
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
            alert(message['text']);
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
            alert(message['text']);
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

    function loadProviderCards(datarow) {
        $providerRow = datarow;
        var success = function(response) {
            var data = jQuery.parseJSON(response);
            if (data.dataset[0] !== undefined) {
                loadExtract(data.dataset[0]);
            }

            var columns = [
                {id: "id", field: "id", name: "ID", width: 40}, 
                {id: "airline", field: "airline", name: "CIA", width: 60}, 
                {id: "card_number", field: "card_number", name: "Número Fidelidade", width: 100}, 
                {id: "access_id", field: "access_id", name: "Assinatura Eletrônica", width: 100}, 
                {id: "access_password", field: "access_password", name: "Senha Múltiplus", width: 100}, 
                {id: "recovery_password", field: "recovery_password", name: "Senha de resgate", width: 100},
                {id: "miles_leftover", field: "miles_leftover", name: "Saldo Cartão", width: 80},
                {id: "edit", name: "Editar", field: "src", width: 40, formatter: function(args) {return "<img id='profileedit'   src ='img/edit.png'></img>"}}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false,
                multiColumnSort: true
            };

            gridCards = new Slick.Grid("#providerCardsTable", data.dataset, columns, options);

            gridCards.onClick.subscribe(function (e) {
                var cell = gridCards.getCellFromEvent(e);
                if (cell.cell > 6) {
                    activate_page("#providerCards_form");
                    ProviderCardsloadform(gridCards.getData()[cell.row]);
                } else {
                    loadExtract(gridCards.getData()[cell.row]);                    
                }
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadProviderCards",
            success: success,
            data: {providerRow: $providerRow, providerFilter: $providerFilter}
        });
    }

    function loadExtract(datarow) {
        $cardsExtractRow = datarow;
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            var columns = [
                {id: "id", field: "id", name: "Operação", width: 100}, 
                {id: "date", field: "date", name: "Referência", width: 100}, 
                {id: "description", field: "description", name: "Descrição", width: 100}, 
                {id: "value", field: "value", name: "Valor Operação", width: 100}, 
                {id: "miles", field: "miles", name: "Milhas", width: 100},
                {id: "name", field: "name", name: "Passageiro", width: 100}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false,
                multiColumnSort: true
            };

            gridExtractCards = new Slick.Grid("#providerExtractTable", data.dataset, columns, options);
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadExtractCards",
            success: success,
            data: {cardsExtractRow: $cardsExtractRow, providerFilter: $providerFilter}
        });
    }

    function ProviderCardsloadform($row) {
        $cardsRow = $row;
        if ($row.airline == 'TAM') {
            document.getElementById("pc_access_id").style.visibility = "visible";
            document.getElementById("pc_access_password").style.visibility = "visible";
        } else {
            document.getElementById("pc_access_id").style.visibility = "collapse";
            document.getElementById("pc_access_password").style.visibility = "collapse";
        }
        
        $('#providercards_card_number').val($row.card_number);
        $('#providercards_recovery_password').val($row.recovery_password);
        $('#providercards_access_id').val($row.access_id);
        $('#providercards_access_password').val($row.access_password);

    }

    function saveProviderCards() {
        $providerCardsRow = {};
        $providerCardsRow.id = $cardsRow.id;
        $providerCardsRow.card_number = $('#providercards_card_number')[0].value;
        $providerCardsRow.recovery_password = $('#providercards_recovery_password')[0].value;
        $providerCardsRow.access_id = $('#providercards_access_id')[0].value;
        $providerCardsRow.access_password = $('#providercards_access_password')[0].value;

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            alert(message['text']);
            loadProvider();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/saveProviderCards",
            data: $providerCardsRow,
            success: success
        });
    }

    function checkCPFProvider() {
        if (!ValidaCPF($('#provider_code')[0].value)){
            alert('CPF Inválido');
            return false;
        }
    }

    function openFilterProvider() {
        var myWindow = window.open("", "MsgWindow", "width=200, height=100");
        myWindow.document.write($('#provider_filter'));        
    }

    function setFilter(name, registration_code, card_number, pax, flight_locator){
        $providerFilter = {};
        $providerFilter.name = name;
        $providerFilter.registration_code = registration_code;
        $providerFilter.card_number = card_number;
        $providerFilter.pax = pax;
        $providerFilter.flight_locator = flight_locator;
    }

    function applyProviderFilter(){
        setFilter($('#filter_provider_name')[0].value,
                  $('#filter_provider_code')[0].value,
                  $('#filter_provider_card_number')[0].value,
                  $('#filter_provider_pax')[0].value,
                  $('#filter_provider_fligthlocator')[0].value);
        loadProvider();        
    }