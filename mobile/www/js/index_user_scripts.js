(function(){
    "use strict";
    /*
    hook up event handlers
    */
    function register_event_handlers() {
        $(document).on("click", ".uib_w_5", function(evt){
            /* Other possible functions are:
            uib_sb.open_sidebar($sb)
            uib_sb.close_sidebar($sb)
            uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
            See js/sidebar.js for the full sidebar API */
            uib_sb.toggle_sidebar($(".uib_w_6"));
        });

        $(document).on("click", "#mnu_fornecedor", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadCity('#provider_city');
            loadProvider();
        });

        $(document).on("click", "#mnu_compra", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            activate_page("#wizard_purchase_1");
        });

        $(document).on("click", "#mnu_registrar_emissao", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            activate_page("#wizard_sales_1");
        });

        $(document).on("click", "#mnu_milesbench", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadMiles();
        });

        $(document).on("click", "#save_provider", function(evt){
            saveProvider();
        });

        $(document).on("click", "#cancel_provider", function(evt){
            activate_page("#provider");
            loadProvider();
        });

        $(document).on("click", "#insert_provider", function(evt){
            activate_page("#provider_form");
            newProvider();
        });

        $(document).on("click", "#remove_provider", function(evt){
            removeProvider();
        });

        $(document).on("click", "#menu_provider", function(evt){
            /* Other possible functions are:
            uib_sb.open_sidebar($sb)
            uib_sb.close_sidebar($sb)
            uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
            See js/sidebar.js for the full sidebar API */
            uib_sb.toggle_sidebar($(".uib_w_6"));
        });

        $(document).on("click", "#purchase1_next", function(evt) {
            loadFormProvider();
        });

        $(document).on("click", "#purchase2_prior", function(evt) {
            activate_page("#wizard_purchase_1");
        });

        $(document).on("click", "#purchase2_next", function(evt){
            activate_page("#wizard_purchase_3");
        });

        $(document).on("click", "#purchase3_prior", function(evt){
            if (new_provider) {
                activate_page("#wizard_purchase_2");
            } else {
                activate_page("#wizard_purchase_1");
            }
        });

        $(document).on("click", "#purchase3_next", function(evt) {
            activate_page("#wizard_purchase_4");
        });

        $(document).on("click", "#purchase4_prior", function(evt){
            activate_page("#wizard_purchase_3");
        });

        $(document).on("click", "#sales1_next", function(evt) {
            loadSalesMiles_CheckedGrid();
        });

        $(document).on("click", "#sales2_prior", function(evt) {
            activate_page("#wizard_sales_1");
        });

        $(document).on("click", "#sales2_next", function(evt){
            activate_page("#wizard_sales_3");
        });

        $(document).on("click", "#sales3_prior", function(evt){
            if (new_provider) {
                activate_page("#wizard_sales_2");
            } else {
                activate_page("#wizard_sales_1");
            }
        });

        $(document).on("click", "#sales3_next", function(evt) {
            activate_page("#wizard_sales_4");
        });

        $(document).on("click", "#sales4_prior", function(evt){
            activate_page("#wizard_sales_3");
        });



    }

    $(document).ready(register_event_handlers);

})();
