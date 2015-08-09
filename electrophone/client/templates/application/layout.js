wavesurfers = {}

// Meteor.startup(function () {
//     var wavesurfer = Object.create(WaveSurfer);
//     wavesurfer.init({
//         container: document.querySelector('#waveform'),
//         waveColor: 'violet',
//         progressColor: 'purple',
//         minPxPerSec: 0,
//         height: 50,
//         fillParent: true,
//     });

//     wavesurfer.on('ready', function () {
//         wavesurfer.play();
//     });

//     wavesurfer.load('/Dropbox/Julian_Casablancas_-_Human_Sadness.mp3');

// });

  Template.dragList.helpers({
    tracks: function(){
      return Tracks.find({session_id: Session.get('sessionID')});
  }});

  Template.dragList.onRendered(function(){
    var el = document.getElementById('trackList');
    var sortable = new Sortable(el, {
      //handle: ".my-handle",
      // Changed sorting within list
      onUpdate: function (/**Event*/evt) {
          var itemEl = evt.item;  // dragged HTMLElement
          // + indexes from onEnd
          console.log(evt);
      },
    });
  });

  Template.body.events({
    'click .delete-button': function (e) {
      e.preventDefault();
      console.log("asd");
      var id = e.target.nextSibling.nextSibling.innerHTML;
      console.log(id);
      Tracks.remove(id);
    },
    'click #playbutton': function(e) {
      console.log(e);
    },
  });


  Template.trackItem.onRendered(function(){
    var id = this.$('.dragdealer').attr('id');
    var track_id = this.$('.number').text();
    var handle = this.$('.dragdealer .handle');
    this.$('.dragdealer .handle').width('100px');
    new Dragdealer(id, {
      x: 0.4,
      slide: false,
      //loose: true,
      callback: function(x, y) {
        console.log(id);
        var posx = handle.css('transform').split(',')[4].trim();
        console.log(posx);
        console.log(track_id);
        Tracks.update({_id: track_id}, {$set:{'start_time':parseInt(posx)}});
      }
    });
    // document.querySelector('.waveform'),
    console.log(this.data.sound_url)
    var wavesurfer = Object.create(WaveSurfer);
    my_track_id = this.data.track_id
    wavesurfer.init({
        container: this.$('.handle')[0],
        waveColor: 'violet',
        progressColor: 'purple',
        minPxPerSec: 0,
        height: 35,
        fillParent: true,
        interact: false
    });

    // wavesurfer.on('ready', function () {
    //     wavesurfer.play();
    // });

    // wavesurfer.load('/Dropbox/Julian_Casablancas_-_Human_Sadness.mp3');
    // wavesurfer.load('/cfs/files/sounds/Bmoiif9L6YNRRPnvo/timer.mp3');
    wavesurfer.load(this.data.sound_url);
    wavesurfers[my_track_id] = wavesurfer
    // Tracks.update({_id: track_id}, {$set:{'wave':wavesurfer}});

  });
