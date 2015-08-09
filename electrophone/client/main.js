if (Session.get('sessionID')==null){
	Session.set('sessionID', 'TestSessionID')
}

//Tracks = new Meteor.Collection('tracks1');

  /*
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click a': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  */

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

//     // wavesurfer.load('/Dropbox/Julian_Casablancas_-_Human_Sadness.mp3');
//     wavesurfer.load('/cfs/files/sounds/Bmoiif9L6YNRRPnvo/timer.mp3');

// });