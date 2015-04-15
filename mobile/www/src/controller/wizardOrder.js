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

            var $init = $('#worder_milesTable td');
            if ($init.length > 0) {
                $('#worder_milesTable').bootstrapTable('destroy');

                $ParentNode = document.getElementById("tb_ordermiles")
                while ($ParentNode.hasChildNodes()) {
                    $ParentNode.removeChild($ParentNode.firstChild);
                }
            }
            
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

            for(var i in data.dataset){
                miles = data.dataset[i];
                $('#worder_milesTable tbody'). append(
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
            var $table = $('#worder_milesTable');
            var $result = $('#events-result');

            $table.bootstrapTable({
            }).on('click-row.bs.table', function (e, row, $element) {
                $milesOrderRow = row;
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
        $wizardOrderRow['flight'] = $('#worder_flight')[0].value;
        $wizardOrderRow['flightHour'] = $('#worder_flightHour')[0].value;
        $wizardOrderRow['cardNumber'] = $milesOrderRow.card_number;

        var success = function(response) {
            var message = jQuery.parseJSON(response).message;
            $resumeByMail = jQuery.parseJSON(response).dataset;

            if(message['type'] == 'S') {
                alert(message['text']);
            }
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
                        '<td>'+$resumeByMail.cardNumber+'</td>'+
                        '<td>'+$resumeByMail.recoveryPassword+'</td>'+
                        '<td>'+$resumeByMail.milesUsed+'</td>'+
                        '<td>'+$resumeByMail.paxName+'</td>'+
                        '<td>'+$resumeByMail.boardingDate+'</td>'+
                        '<td>'+$resumeByMail.flight+'</td>'+
                        '<td>'+$resumeByMail.flightHour+'</td>'+
                    '</tr>'+
                '</table>'+
            '</body>'
        
        );

/*        $('#worder_resume tbody'). append(
            '<tr>'+
            '<td>'+$resumeByMail.cardNumber+'</td>'+
            '<td>'+$resumeByMail.recoveryPassword+'</td>'+
            '<td>'+$resumeByMail.milesUsed+'</td>'+
            '<td>'+$resumeByMail.paxName+'</td>'+
            '<td>'+$resumeByMail.boardingDate+'</td>'+
            '<td>'+$resumeByMail.flight+'</td>'+
            '<td>'+$resumeByMail.flightHour+'</td>'+
            '</tr>'
        );
        var $table = $('#worder_resume');
        var $result = $('#events-result');

        $table.bootstrapTable({
        }).on('click-row.bs.table', function (e, row, $element) {
            $resumeByMail = row;
        });*/        
    }

    function sendMail() {
        var success = function(response) {
            activate_page("#order");
            loadOrder();
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/mailOrder",
            data: $resumeByMail,
            success: success
        });
    }

