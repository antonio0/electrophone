Template.changeSession.events({
	'submit form': function(e) {
		e.preventDefault();
		new_session_id = $(e.target).find('[name=new-session]').val()
		Session.set('sessionID', new_session_id)
		console.log('NEW SESSION ID: ' + Session.get('sessionID'))
		// var post = {
		// 	url: $(e.target).find('[name=url]').val(),
		// 	title: $(e.target).find('[name=title]').val()
		// };
		// post._id = Posts.insert(post);
		// Router.go('postPage', post);
	}
});