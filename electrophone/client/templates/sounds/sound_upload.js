// wavesurfers = {}

Template.soundUpload.events({
   'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        console.log(file)
        Sounds.insert(file, function (err, fileObj) {
          if (err){
             // handle error
             console.error(err);
          } else {
            setTimeout(function() {
              var audio = new Audio(fileObj.url());
              console.log(audio.duration);
              audio.addEventListener("loadedmetadata", function(_event) {
                var duration = audio.duration;
                console.log(duration);
                console.log(fileObj.url());
                var my_track_id = Math.floor((Math.random() * 100000) + 1);
                Tracks.insert({
              		session_id: Session.get('sessionID'),
              		track_id: my_track_id,
              		sound_id: fileObj._id,
                  sound_url: fileObj.url(),
              		sound_name: fileObj.name(),
                  start_time: 0,
                  track_index: -1,
                  track_length: duration
              	});
                // var wavesurfer = Object.create(WaveSurfer);
                // var myelement = this.$('track-'+my_track_id+' .handle')[0]
                // wavesurfer.init({
                //   container: myelement,
                //   waveColor: 'violet',
                //   progressColor: 'purple',
                //   minPxPerSec: 0,
                //   height: 35,
                //   fillParent: true,
                // });
                // wavesurfer.load(fileObj.url());
                // wavesurfers[my_track_id] = wavesurfer
              });
            },2000);
            console.log(fileObj)
            console.log('MAKING A TRACK')

          }
        });
     });
   }
});
