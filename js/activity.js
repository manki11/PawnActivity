define(["sugar-web/activity/activity", "sugar-web/env", "sugar-web/graphics/icon"], function (activity, env, icon) {    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        var currentenv;
        env.getEnvironment(function (err, environment) {
            currentenv = environment;
            document.getElementById("user").innerHTML = "<h1>" + "Hello" + " " + environment.user.name + " !</h1>";
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

            document.getElementById("user").innerHTML = "<h1>" + currentenv.user.name + " played !</h1>";
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

        env.getEnvironment(function(err, environment) {
            currentenv = environment;
            document.getElementById("user").innerHTML = "<h1>"+"Hello"+" "+environment.user.name+" !</h1>";

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


    });

});
