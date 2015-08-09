Template.newSession.onCreated( function() {
	random_session_id = Math.floor((Math.random() * 100000) + 1)
	next_url = '/session/' + random_session_id;
	Router.go(next_url);
});