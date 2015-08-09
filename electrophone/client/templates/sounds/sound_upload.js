Template.soundUpload.events({
   'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        console.log(file)
        Sounds.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
            console.log(fileObj)
            console.log('MAKING A TRACK')
          	Tracks.insert({
          		session_id: Session.get('sessionID'),
          		track_id: Math.floor((Math.random() * 100000) + 1),
          		sound_id: fileObj._id,
          		sound_name: fileObj.name(),
              start_time: 0,
              track_index: -1
          	});
          }
        });
     });
   }
});