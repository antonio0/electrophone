current_audio = null;
playing_sounds = [];
waiting_sounds = [];

// Template.playButton.events({
// 	'click button': function () {
// 		var sound_files = Sounds.find().fetch();
// 		console.log(sound_files[0].url())
// 		console.log(sound_files[0].name())
// 		my_url = sound_files[0].url()
// 		// var audio = new Audio('localhost/uploads/sounds-NoYdzibZrGGgjPYHx-timer.mp3');
// 		if(current_audio != null){
// 			current_audio.pause()
// 			current_audio.src='';
// 			current_audio = null;
// 		}
// 		var audio = new Audio(my_url);
// 		current_audio = audio;
// 		audio.play();
// 		console.log('PLAY SOUND');
// 	}
// });

Template.playButton.events({
	'click button': function () {
		session_tracks = getTracksBySession(Session.get('sessionID'));
		session_sounds = getSoundsByTracks(session_tracks);
		playAllSoundsWithOffsets(session_sounds);
	}
});

var getTracksBySession = function(sessionid) {
	return Tracks.find({session_id: sessionid}).fetch()
};

var getSoundsByTracks = function(tracksList) {
	soundsList = []
	tracksList.forEach(function(track) {
		sound_file = Sounds.findOne({_id: track.sound_id});
		// console.log(sound_file)
		soundsList.push({file: sound_file, start_time: track.start_time})
	});
	return soundsList
};

var playAllSoundsWithOffsets = function(soundsList) {
	if (playing_sounds.length != 0) {
		playing_sounds.forEach(function(playing) {
			playing.pause();
		});
		playing_sounds = []
		waiting_sounds.forEach(function(waiting) {
			clearTimeout(waiting);
		});
		waiting_sounds = []
	}
	soundsList.forEach(function(sound) {
		sound_file = sound.file;
		start_time = sound.start_time;
		console.log(start_time)
		playSoundOffset(sound_file.url(), start_time);
	});
	console.log('PLAY ALL SOUNDS');
};

var playSoundOffset = function(path, ms_offset) {
	var audio = new Audio(path);
	playing_sounds.push(audio)
	console.log(ms_offset*1000)
	// setTimeout(playAudio(audio), ms_offset*1000);
	waiting_sounds.push(setTimeout(function() { audio.play(); }, ms_offset*1000));
};

var playAudio = function(audio) {
	console.log('DELAY DONE')
	audio.play()
};