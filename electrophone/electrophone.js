Tracks = new Meteor.Collection('tracks');

if (Meteor.isClient) {
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

  Meteor.startup(function () {
    var wavesurfer = Object.create(WaveSurfer);
    wavesurfer.init({
        container: document.querySelector('#waveform'),
        waveColor: 'violet',
        progressColor: 'purple',
        minPxPerSec: 0,
        height: 50,
        fillParent: true,
    });

    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });

    wavesurfer.load('/Dropbox/Julian_Casablancas_-_Human_Sadness.mp3');

  });

  Template.dragList.helpers({
    tracks: function(){
      return Tracks.find({});
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
      var number = e.target.nextSibling.nextSibling.innerHTML;
      console.log(number);
    },
    'click #playbutton': function(e) {
      console.log(e);
    },
  });


  Template.trackItem.onRendered(function(){
    var id = this.$('.dragdealer').attr('id');
    var number = this.$('.number').text();
    var handle = this.$('.dragdealer .handle');
    this.$('.dragdealer .handle').width(''+number*100+'px');
    new Dragdealer(id, {
      slide: false,
      //loose: true,
      callback: function(x, y) {
        console.log(id);
        var posx = handle.css('transform').split(',')[4];
        console.log(posx);
      }
    });

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Tracks.find({}).count() === 0) {
      _(5).times(function(n) {
        Tracks.insert({name:'Track '+n+1,number:n+1});
      });
    }
});

}
