var wizardOrderRow;
var wizard_worder_1;
var milesOrderRow;
var resumeByMail;

    function loadOrderMiles_Grid() {
        $wizard_worder_1 = {};
        $wizard_worder_1['airline'] = $('#worder_airline')[0].value;
        $wizard_worder_1['milesUsed'] = $('#worder_milesUsed')[0].value;

        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#wizard_worder_2");

            $ParentNode = document.getElementById('wizardorderheader2');
            if ($ParentNode) {
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }            
            }
            $('#wizardorderheader2').append('<h2>Uai Milhas - Pedidos ('+$wizard_worder_1.milesUsed+')</h2>');

            $('#worder_client').selectpicker('val','');
            $('#worder_from').selectpicker('val','');
            $('#worder_to').selectpicker('val','');
            $('#worder_pax_name').val('');
            $('#worder_registration_code').val('');
            $('#worder_birthdate').val('');
            $('#worder_description').val('');
            $('#worder_boardingDate').val('');
            $('#worder_flight').val('');
            $('#worder_flightHour').val('');
            $('#worder_return_flight').val('');
            $('#worder_return_flightHour').val('');
            $('#worder_returnDate').val('');
            

            var grid;
            var columns = [
                {id: "name", field: "name", name: "Nome", width: 200}, 
                {id: "email", field: "email", name: "Email", width: 150}, 
                {id: "phoneNumber", field: "phoneNumber", name: "Telefone", width: 100}, 
                {id: "airline", field: "airline", name: "Companhia", width: 60}, 
                {id: "card_number", field: "card_number", name: "Número Cartão", width: 100}, 
                {id: "leftover", field: "leftover", name: "Saldo Milhas", width: 100}, 
                {id: "due_date", field: "due_date", name: "Vencimento", width: 100}, 
                {id: "contract_due_date", field: "contract_due_date", name: "Limite Contrato", width: 100}, 
                {id: "cost_per_thousand", field: "cost_per_thousand", name: "Custo por 1000", width: 100}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false
            };

            grid = new Slick.Grid("#worder_milesTable", data.dataset, columns, options);

            grid.onClick.subscribe(function (e) {
                var cell = grid.getCellFromEvent(e);
                $milesOrderRow = grid.getData()[cell.row];
            });
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadSalesMiles",
            data: $wizard_worder_1,
            success: success
        });
    }

    function saveWizardOrder() {
        $wizardOrderRow = {};
        $wizardOrderRow['status'] = 'Pendente';
        $wizardOrderRow['client'] = $('#worder_client')[0].value;
        $wizardOrderRow['airline'] = $wizard_worder_1['airline'];
        $wizardOrderRow['from'] = $('#worder_from')[0].value;
        $wizardOrderRow['to'] = $('#worder_to')[0].value;
        $wizardOrderRow['milesUsed'] = $wizard_worder_1['milesUsed'];
        $wizardOrderRow['paxName'] = $('#worder_pax_name')[0].value;
        $wizardOrderRow['paxRegistrationCode'] = $('#worder_registration_code')[0].value;
        $wizardOrderRow['birthdate'] = $('#worder_birthdate')[0].value;
        $wizardOrderRow['description'] = $('#worder_description')[0].value;
        $wizardOrderRow['boardingDate'] = $('#worder_boardingDate')[0].value;
        $wizardOrderRow['returnDate'] = $('#worder_returnDate')[0].value;
        $wizardOrderRow['flight'] = $('#worder_flight')[0].value;
        $wizardOrderRow['flightHour'] = $('#worder_flightHour')[0].value;
        $wizardOrderRow['return_flight'] = $('#worder_return_flight')[0].value;
        $wizardOrderRow['return_flightHour'] = $('#worder_return_flightHour')[0].value;
        $wizardOrderRow['cardNumber'] = $milesOrderRow.card_number;

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            $resumeByMail = jQuery.parseJSON(response).dataset;

            alert(message['text']);
            showOrderResume();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/saveOrder",
            data: $wizardOrderRow,
            success: success
        });
    }

    function showOrderResume() {
        activate_page("#wizard_worder_4");

        var $init = $('#worder_resume td');
        if ($init.length > 0) {
            $('#worder_resume').bootstrapTable('destroy');

            $ParentNode = document.getElementById("tb_orderresume")
            while ($ParentNode.hasChildNodes()) {
                $ParentNode.removeChild($ParentNode.firstChild);
            }
        }
             
        $ParentNode = document.getElementById('div_order_resume');
        if ($ParentNode) {
            while ($ParentNode.hasChildNodes()) {
                $ParentNode.removeChild($ParentNode.firstChild);
            }            
        }

        if ($resumeByMail[1] == null) {
            $('#div_order_resume'). append(
                '<head>'+
                    '<style>'+
                        'table, th, td {'+
                            'border: 1px solid black;'+
                            'border-collapse: collapse;'+
                        '}'+
                        'th, td {'+
                            'padding: 5px;'+
                            'text-align: left;'+
                        '}'+
                    '</style>'+
                '</head>'+
                '<body>'+
                    '<table style="width:100%">'+
                        '<tr>'+
                            '<th>Fidelidade</th>'+
                            '<th>Senha Resgate</th>'+
                            '<th>Quantidade de Pontos</th>'+
                            '<th>Passageiro</th>'+
                            '<th>Data Embarque</th>'+
                            '<th>Decricao Voo</th>'+
                            '<th>Horario/Trajeto Voo</th>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+$resumeByMail[0].cardNumber+'</td>'+
                            '<td>'+$resumeByMail[0].recoveryPassword+'</td>'+
                            '<td>'+$resumeByMail[0].milesUsed+'</td>'+
                            '<td>'+$resumeByMail[0].paxName+'</td>'+
                            '<td>'+$resumeByMail[0].boardingDate+'</td>'+
                            '<td>'+$resumeByMail[0].flight+'</td>'+
                            '<td>'+$resumeByMail[0].flightHour+'</td>'+
                        '</tr>'+
                    '</table>'+
                '</body>'
            
            );
        } else {
        $('#div_order_resume'). append(
            '<head>'+
                '<style>'+
                    'table, th, td {'+
                        'border: 1px solid black;'+
                        'border-collapse: collapse;'+
                    '}'+
                    'th, td {'+
                        'padding: 5px;'+
                        'text-align: left;'+
                    '}'+
                '</style>'+
            '</head>'+
            '<body>'+
                '<table style="width:100%">'+
                    '<tr>'+
                        '<th>Fidelidade</th>'+
                        '<th>Senha Resgate</th>'+
                        '<th>Quantidade de Pontos</th>'+
                        '<th>Passageiro</th>'+
                        '<th>Data Embarque</th>'+
                        '<th>Decricao Voo</th>'+
                        '<th>Horario/Trajeto Voo</th>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>'+$resumeByMail[0].cardNumber+'</td>'+
                        '<td>'+$resumeByMail[0].recoveryPassword+'</td>'+
                        '<td>'+$resumeByMail[0].milesUsed+'</td>'+
                        '<td>'+$resumeByMail[0].paxName+'</td>'+
                        '<td>'+$resumeByMail[0].boardingDate+'</td>'+
                        '<td>'+$resumeByMail[0].flight+'</td>'+
                        '<td>'+$resumeByMail[0].flightHour+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>'+$resumeByMail[1].cardNumber+'</td>'+
                        '<td>'+$resumeByMail[1].recoveryPassword+'</td>'+
                        '<td>'+$resumeByMail[1].milesUsed+'</td>'+
                        '<td>'+$resumeByMail[1].paxName+'</td>'+
                        '<td>'+$resumeByMail[1].boardingDate+'</td>'+
                        '<td>'+$resumeByMail[1].flight+'</td>'+
                        '<td>'+$resumeByMail[1].flightHour+'</td>'+
                    '</tr>'+
                '</table>'+
            '</body>'
        );
            
        }
    }

    function sendMail() {
        $flight = $resumeByMail[0];
        $returnFlight = $resumeByMail[1];

        var success = function(response) {
            activate_page("#order");
            loadOrder();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/mailOrder",
            data: {flight: $flight, returnFlight: $returnFlight},
            success: success
        });
    }

