/**
 * Created by robertomartins on 1/19/2015.
 */
    function loadMiles() {
        var success = function(response) {
            var data = jQuery.parseJSON(response);

            activate_page("#miles")

            var grid;
            var columns = [
                {id: "name", name: "Nome", field: "name", width: 200},
                {id: "email", name: "Email", field: "email", width: 150},
                {id: "phoneNumber", name: "Telefone", field: "phoneNumber", width: 100},
                {id: "airline", name: "Companhia", field: "airline", width: 100},
                {id: "card_number", name: "Número Cartão", field: "card_number", width: 100},
                {id: "leftover", name: "Saldo Milhas", field: "leftover", width: 100},
                {id: "due_date", name: "Vencimento", field: "due_date", width: 100},
                {id: "contract_due_date", name: "Limite Contrato", field: "contract_due_date", width: 100},
                {id: "cost_per_thousand", name: "Custo por 1000", field: "cost_per_thousand", width: 100}];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false
            };

            grid = new Slick.Grid("#milesTable", data.dataset, columns, options);
        };

        $.ajax({
            type: "POST",
            url: "../../backend/application/index.php?rota=/loadMiles",
            success: success
        });
    }

