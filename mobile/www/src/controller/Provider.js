/**
 * Created by robertomartins on 1/19/2015.
 */
function loadProvider() {
    var success = function(response) {
        var providerList = jQuery.parseJSON(response);

        $('#providerTable').bootstrapTable({
            data: providerList.dataset,
            cache: false,
            height: 400,
            striped: true,
            pagination: false,
            pageSize: 50,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            showColumns: true,
            showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            smartDisplay: true,
            clickToSelect: true,
            singleSelect: true,
            columns: [{
                field: 'id',
                title: 'ID',
                align: 'right',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'name',
                title: 'Nome',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'city',
                title: 'Cidade',
                align: 'left',
                valign: 'top',
                sortable: true
            }]
        });

        //for(var i in data.dataset){
        //    var provider = data.dataset[i];
        //    $('#providerlist tbody'). append(
        //        '<tr id="tr_id'+provider.id+'" class="tr-class-'+provider.id+'">'+
        //        '<td id="td_id_'+provider.id+'" class="td-class-'+provider.id+'">'+provider.id+'</td>'+
        //        '<td>'+provider.name+'</td>'+
        //        '<td>'+provider.city+'</td>'+
        //        '</tr>'
        //    );
    };

    $.ajax({
        type: "POST",
        url: "../../backend/application/index.php?rota=/loadProvider",
        success: success
    });
};
