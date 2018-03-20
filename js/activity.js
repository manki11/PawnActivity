define(["sugar-web/activity/activity", "sugar-web/env"], function (activity, env) {

    // Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();

        env.getEnvironment(function(err, environment) {
            document.getElementById("user").innerHTML = "<h1>"+"Hello"+" "+environment.user.name+" !</h1>";
        });

	});

});
