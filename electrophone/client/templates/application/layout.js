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

  Template.trackItem.events({
    'click .delete-button': function (e) {
      e.preventDefault();
      console.log("delete event");
      var id = e.target.nextSibling.nextSibling.innerHTML;
      console.log(id);
      Tracks.remove(id);
    },
  });

  var dragdealers = {};

  Template.trackItem.onRendered(function(){
    var MAX_TIME = 3*60; // 2 minutes
    var dragdealer = this.$('.dragdealer');
    var id = this.$('.dragdealer').attr('id');
    var track_id = this.$('.number').text();
    var handle = this.$('.dragdealer .handle');
    var handle = this.$('.dragdealer .handle');
    console.log(this.$('.dragdealer').width());
    var trackObj = Tracks.findOne(track_id);
    var widthPx = (trackObj.track_length * dragdealer.width()) / MAX_TIME;
    console.log(widthPx);
    handle.width(widthPx+'px');
    //leftPx = (trackObj.start_time * this.$('.dragdealer').width()) / MAX_TIME;
    //handle.css('transform', 'matrix(1, 0, 0, 1, '+leftPx+', 0)');
    console.log('start_time='+trackObj.start_time);
    console.log('x='+trackObj.start_time*2 / MAX_TIME);
    dragdealers[track_id] = new Dragdealer(id, {
      x: trackObj.xpos,
      slide: false,
      //loose: true,
      dragStopCallback: function(x, y) {
        console.log(id);
        var leftx = parseInt(handle.css('transform').split(',')[4].trim());
        console.log("leftx="+leftx);
        console.log("x="+x);
        var starttime = leftx * MAX_TIME / dragdealer.width();
        console.log(starttime);
        Tracks.update({_id: track_id}, {$set:{'start_time':starttime, 'xpos': x}});
      }
    });
    // document.querySelector('.waveform'),
    console.log(this.data.sound_url)
    var wavesurfer = Object.create(WaveSurfer);
    my_track_id = this.data.track_id
    wavesurfer.init({
        container: this.$('.handle')[0],
        waveColor: 'red',
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

  Template.trackItem.onRendered(function () {
    var track_id = Template.instance().$('.number').text();
    Tracker.autorun(function () {
      dragdealers[track_id].setValue(Tracks.findOne(track_id).xpos,0);
    });
  });
