Template.tracksPage.onCreated( function() {
	Session.set('sessionID', this.data.sessionid)
	console.log('NEW SESSION ID: ' + Session.get('sessionID'))
});