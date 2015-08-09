Template.stopButton.events({
	'click button': function () {
		// if(current_audio != null){
		// 	current_audio.pause();
		// 	current_audio.src='';
		// 	current_audio = null;
		// 	console.log('STOP SOUND')
		// }
		if (playing_sounds.length != 0) {
		playing_sounds.forEach(function(playing) {
			playing.pause();
		});
		playing_sounds = []
		waiting_sounds.forEach(function(waiting) {
			clearTimeout(waiting);
		});
		waiting_sounds = []
		console.log('STOP SOUND')
	}
	}
});