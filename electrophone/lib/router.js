Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return [Meteor.subscribe('posts'), Meteor.subscribe('sounds'), Meteor.subscribe('tracks')]; }
});

// Router.route('/', {name: 'postsList'});
// Router.route('/posts/:_id', {
// 	name: 'postPage',
// 	data: function() { return Posts.findOne(this.params._id); }
// });

// Router.route('/submit', {name: 'postSubmit'});

Router.route('/', {name: 'newSession'});

Router.route('/session/:_sessionid', {
	name: 'tracksPage',
	data: function() { return {sessionid: this.params._sessionid}; }
});

// Router.onBeforeAction('dataNotFound', {only: 'postPage'});
