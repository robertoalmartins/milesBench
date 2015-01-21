/**
 * Created by robertomartins on 1/19/2015.
 */
function loadProvider() {
    var success = function(response) {
        var data = jQuery.parseJSON(response);

        for(var i in data.dataset){
            var provider = data.dataset[i];
            $('#providerlist tbody'). append(
                '<tr id="tr_id'+provider.id+'" class="tr-class-'+provider.id+'">'+
                '<td id="td_id_'+provider.id+'" class="td-class-'+provider.id+'">'+provider.id+'</td>'+
                '<td>'+provider.name+'</td>'+
                '<td>'+provider.city+'</td>'+
                '</tr>'
            );
        }
    };

    $.ajax({
        type: "POST",
        url: "../../backend/application/index.php?rota=/loadProvider",
        success: success
    });
}
