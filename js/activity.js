define(["sugar-web/activity/activity", "sugar-web/env", "sugar-web/graphics/icon", "webL10n"], function (activity, env, icon, webL10n) {
    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        var currentenv;
        env.getEnvironment(function(err, environment) {
            currentenv = environment;

            // Set current language to Sugarizer
            var defaultLanguage = (typeof chrome != 'undefined' && chrome.app && chrome.app.runtime) ? chrome.i18n.getUILanguage() : navigator.language;
            var language = environment.user ? environment.user.language : defaultLanguage;
            webL10n.language.code = language;

            // Load from datastore
            if (!environment.objectId) {
                console.log("New instance");
            } else {
                activity.getDatastoreObject().loadAsText(function(error, metadata, data) {
                    if (error==null && data!=null) {
                        pawns = JSON.parse(data);
                        drawPawns();
                    }
                });
            }
        });

        // Draw pawns
        var pawns = [];
        var drawPawns = function () {
            document.getElementById("pawns").innerHTML = '';
            for (var i = 0; i < pawns.length; i++) {
                var pawn = document.createElement("div");
                pawn.className = "pawn";

                document.getElementById("pawns").appendChild(pawn);
                icon.colorize(pawn, pawns[i]);
            }
        };

        // Handle click on add
        document.getElementById("add-button").addEventListener('click', function (event) {

            pawns.push(currentenv.user.colorvalue);
            drawPawns();

            document.getElementById("user").innerHTML = "<h1>"+webL10n.get("Played", {name:currentenv.user.name})+"</h1>";
        });

        // Save in Journal on Stop
        document.getElementById("stop-button").addEventListener('click', function (event) {
            console.log("writing...");
            var jsonData = JSON.stringify(pawns);
            activity.getDatastoreObject().setDataAsText(jsonData);
            activity.getDatastoreObject().save(function (error) {
                if (error === null) {
                    console.log("write done.");
                } else {
                    console.log("write failed.");
                }
            });
        });

        // Process localize event
        window.addEventListener("localized", function() {
            document.getElementById("user").innerHTML = "<h1>"+webL10n.get("Hello", {name:currentenv.user.name})+"</h1>";
            document.getElementById("add-button").title = webL10n.get("AddPawn");
        });


    });

});
