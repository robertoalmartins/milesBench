(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
         $(document).on("click", ".uib_w_6", function(evt)
        {
         activate_page("#mb_mainpage"); 
        });
}
 $(document).ready(register_event_handlers);
})();
