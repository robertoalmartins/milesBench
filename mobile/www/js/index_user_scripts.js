(function(){
    "use strict";
    /*
    hook up event handlers
    */
    function register_event_handlers() {

        $(document).on("click", ".uib_w_21", function(evt){
            /* Other possible functions are:
            uib_sb.open_sidebar($sb)
            uib_sb.close_sidebar($sb)
            uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
            See js/sidebar.js for the full sidebar API */
            uib_sb.toggle_sidebar($(".uib_w_6"));
        });

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
            activate_page("#provider");
            loadProvider();
        });
    }

    $(document).ready(register_event_handlers);
})();
