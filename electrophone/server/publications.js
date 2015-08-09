Meteor.publish('posts', function() {
	return Posts.find();
});
Meteor.publish('sounds', function() {
	return Sounds.find();
});
Meteor.publish('tracks', function() {
	return Tracks.find();
});