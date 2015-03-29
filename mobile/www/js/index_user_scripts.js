(function(){
    "use strict";
    /*
    hook up event handlers
    */
    function register_event_handlers() {
        /****_________________________________________________________________________________________________****/
        $(document).on("click", ".uib_w_5", function(evt){
            /* Other possible functions are:
            uib_sb.open_sidebar($sb)
            uib_sb.close_sidebar($sb)
            uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
            See js/sidebar.js for the full sidebar API */
            uib_sb.toggle_sidebar($(".uib_w_6"));
        });
        /****_________________________________________________________________________________________________****/
        $(document).on("click", "#mnu_milesbench", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadMiles();
        });

        /****_________________________________________________________________________________________________****/
        $(document).on("click", "#mnu_order", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadClient('#order_client');
            loadAirport('#order_from');
            loadAirport('#order_to');
            loadAirline('#order_airline');
            loadOrder();
        });

        $(document).on("click", "#save_order", function(evt){
            saveOrder();
        });

        $(document).on("click", "#cancel_order", function(evt){
            activate_page("#order");
            loadOrder();
        });

        $(document).on("click", "#insert_order", function(evt){
            loadClient('#worder_client');
            loadAirport('#worder_from');
            loadAirport('#worder_to');
            loadAirline('#worder_airline');
            activate_page("#wizard_worder_1");
            $('#worder_airline').val('');
            $('#worder_milesUsed').val('');
        });

        $(document).on("click", "#remove_order", function(evt){
            removeOrder();
        });

        $(document).on("click", "#next_worder_1", function(evt){
            loadOrderMiles_Grid();
        });

        $(document).on("click", "#worder2_prior", function(evt){
            activate_page("#wizard_worder_1");
        });


        $(document).on("click", "#worder2_next", function(evt){
            activate_page("#wizard_worder_3");
        });

        $(document).on("click", "#save_worder", function(evt){
            saveWizardOrder();
            activate_page("#order");
            loadOrder();
        });

        $(document).on("click", "#prior_worder", function(evt){
            activate_page("#wizard_worder_2");
        });

        $(document).on("click", "#cancel_worder", function(evt){
            activate_page("#order");
            loadOrder();
        });

        /****_________________________________________________________________________________________________****/
        $(document).on("click", "#mnu_provider", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadState('#provider_state');
            loadProvider();
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

        /****_________________________________________________________________________________________________****/
        $(document).on("click", "#mnu_agency", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadState('#agency_state');
            loadAgency();
        });

        $(document).on("click", "#save_agency", function(evt){
            saveAgency();
        });

        $(document).on("click", "#cancel_agency", function(evt){
            activate_page("#agency");
            loadAgency();
        });

        $(document).on("click", "#insert_agency", function(evt){
            activate_page("#agency_form");
            newAgency();
        });

        $(document).on("click", "#remove_agency", function(evt){
            removeAgency();
        });


        /****_________________________________________________________________________________________________****/
        $(document).on("click", "#mnu_profile", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadState('#profile_state');
            loadProfile();
        });

        $(document).on("click", "#save_profile", function(evt){
            saveProfile();
        });

        $(document).on("click", "#cancel_profile", function(evt){
            activate_page("#profile");
            loadProfile();
        });

        $(document).on("click", "#insert_profile", function(evt){
            activate_page("#profile_form");
            newProfile();
        });

        $(document).on("click", "#remove_profile", function(evt){
            removeProfile();
        });

        /****_________________________________________________________________________________________________****/
        $(document).on("click", "#mnu_purchase", function(evt){
            setCityNameEnviroment('');
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadSelectProvider('#wizard_selectprovider');
            loadAirline('#purchase_airline');
            activate_page("#wizard_purchase_1");
        });

        $(document).on("click", "#purchase1_next", function(evt) {
            loadFormProvider();
        });

        $(document).on("click", "#purchase2_prior", function(evt) {
            activate_page("#wizard_purchase_1");
        });

        $(document).on("click", "#purchase2_next", function(evt){
            savelocal_provider();
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
            savelocal_purchase();
            activate_page("#wizard_purchase_4");
        });

        $(document).on("click", "#purchase4_prior", function(evt){
            activate_page("#wizard_purchase_3");
        });

        $(document).on("click", "#purchase4_save", function(evt){
            saveserver_wizard();
        });

        /****_________________________________________________________________________________________________****/
        $(document).on("click", "#mnu_sales", function(evt){
            uib_sb.toggle_sidebar($(".uib_w_6"));
            loadSalesMiles_Order();
        });

        $(document).on("click", "#sales1_next", function(evt) {
            loadSalesMiles_Grid();
        });

        $(document).on("click", "#sales2_prior", function(evt) {
            activate_page("#wizard_sales_1");
        });

        $(document).on("click", "#sales2_next", function(evt){
            activate_page("#wizard_sales_3");
        });

        $(document).on("click", "#sales3_prior", function(evt){
            activate_page("#wizard_sales_2");
        });

        $(document).on("click", "#sales3_next", function(evt) {
            saveSale();
            loadSalesMiles_Order();
        });
        /****_________________________________________________________________________________________________****/
    }

    $(document).ready(register_event_handlers);

})();
