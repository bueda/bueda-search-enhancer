// ==UserScript==
// @name           Bueda Powered Craigslist Enhanced Search
// @namespace      http://www.bueda.com
// @description    Script for enhancing searches in craigslist using Bueda api
// @include        http://*.craigslist.org/
// ==/UserScript==
window.addEventListener('load',function(){

    var form = document.getElementById('search');

    if(form) {
        // Attach the handler if search form is present in the page
        form.addEventListener('submit',function(e){
            // Prevent the form from being submitted by default
            e.preventDefault();        

            // Query string for bueda web service request
            var query = document.getElementById('query').value;
            // API KEY for requesting bueda web service
	        var api_key = 'vEmEfeiUADwfTP67Cjftq1w91hIJ8hrlY6L8eQ';

            // URL for bueda web service
            var URL = 'http://api.bueda.com/enriched?apikey='+api_key+'&tags='+query;

            // Cross domain request to bueda web service
            GM_xmlhttpRequest({
                method:'GET',
                url:URL,
                // callback function for a succesful response
                onload:function(response){
                    if(response.status==200){
                        var jsonResponse = JSON.parse(response.responseText);
		        
                        var query = "";
                        // Change the following few lines to populate enhanced keywords once the api supports it.
                        var cleanTags = jsonResponse.result.cleanup;

                        // Construct the query parameter by separating keywords using pipes
                        for(var i in cleanTags){
                            query += cleanTags[i]+'|';
                        }

                        query = query.substr(0,query.length-1);
                        // Set the 'query' field with new query value
                        document.getElementById('query').value = query;

                        //alert(document.getElementById('query').value)
		    
                        // Submit the form with bueda expanded keywords
                        form.submit();
                    }
                },
                // callback function for a failure response
                onerror:function(response){
                    // Alert used for debugging
                    alert('Something went wrong!');
                    // Submit the form with the original keywords
                    form.submit();
                }
            });

        },false);
    }

},false);
