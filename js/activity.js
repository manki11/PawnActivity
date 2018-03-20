define(["sugar-web/activity/activity", "sugar-web/env", "sugar-web/graphics/icon"], function (activity, env, icon) {    // Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();

        var currentenv;
        env.getEnvironment(function(err, environment) {
            currentenv = environment;
            document.getElementById("user").innerHTML = "<h1>"+"Hello"+" "+environment.user.name+" !</h1>";
        });

        // Handle click on add
        document.getElementById("add-button").addEventListener('click', function (event) {
            var pawn = document.createElement("div");
            pawn.className = "pawn";

            document.getElementById("pawns").appendChild(pawn);
            icon.colorize(pawn, currentenv.user.colorvalue);
            console.log(currentenv.user.colorvalue);

            document.getElementById("user").innerHTML = "<h1>"+currentenv.user.name+" played !</h1>";
        });


    });

});
