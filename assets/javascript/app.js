// --Buiding the main Screen--------------------------------------------------------

function buildScreen() {
  // $('#mainContainer').empty()

  var div3 = $('<div>');
  div3.attr('id', 'rightContainer');
  $('#mainContainer').append(div3)
  div3.addClass('rightContainerClass')
  div3.addClass('border')
  $('#rightContainer').html('<h2>' + 'Add Train' + '</h2>');

  var trainName = $('<input/>', {
    type: 'text',
    id: 'trainName',
    name: 'train',
    placeholder: 'Add a new train name'
  })

  var newDestination = $('<input/>', {
    type: 'text',
    id: 'newDestination',
    name: 'destination',
    placeholder: 'Add a new destination'
  })

  var firstTrainTime = $('<input/>', {
    type: 'text',
    id: 'firstTrainTime',
    name: 'firstTrainTime',
    placeholder: 'Add time (HH:mm - militar time)'
  })
  var frequency = $('<input/>', {
    type: 'text',
    id: 'frequency',
    name: 'frequency',
    placeholder: 'train frequency (mins)'
  })

  $('#rightContainer').append(trainName);
  trainName.addClass('inputNewTrain');
  newDestination.addClass('inputNewTrain');
  $('#rightContainer').append(newDestination);
  firstTrainTime.addClass('inputNewTrain');
  $('#rightContainer').append(firstTrainTime);
  frequency.addClass('inputNewTrain');
  $('#rightContainer').append(frequency);

  var button = $('<button> submit </button>');
  button.attr('id', 'addTrain')
  $('#rightContainer').append(button)
  button.addClass('button')
}

buildScreen()

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCKe7pzW0oYyCzqk0np5mp1gPGwqOQsmOQ",
    authDomain: "trainschedule-74886.firebaseapp.com",
    databaseURL: "https://trainschedule-74886.firebaseio.com",
    projectId: "trainschedule-74886",
    storageBucket: "",
    messagingSenderId: "252096146711"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
  var database = firebase.database();

// Initial Variables

var trainName = '';
var newDestination = '';
var firstTrainTime = '';
var frequency = '';

// ---On click event to submit a new Train-------------------------------------
$('#addTrain').on('click', function(event) {
  event.preventDefault();

  // Get inputs
  trainName =  $('#trainName').val().trim();
  newDestination = $('#newDestination').val().trim();
  firstTrainTime = $('#firstTrainTime').val().trim();
  frequency = moment($('#frequency').val().trim(),'mm').format('mm');
  console.log(firstTrainTime);
  console.log(frequency);
// Change what is saved in firebase

database.ref().push({
   trainName: trainName,
   newDestination: newDestination,
   firstTrainTime: firstTrainTime,
   frequency: frequency
 });

}); // end On click event

// database.ref().on("value", function(snapshot) {
 database.ref().on("child_added", function(childSnapshot) {

   console.log(childSnapshot.val());

      var current_time = moment().format('HH:mm');
      var current_time_hours = moment().format('HH');
      var currentTime = current_time + (current_time_hours * 60)

      // var moment().startOf('hour').fromNow()
      var trainNameSS = childSnapshot.val().trainName;
      var newDestinationSS = childSnapshot.val().newDestination;
      var firstTrainTimeSS = childSnapshot.val().firstTrainTime;
      var frequencySS = childSnapshot.val().frequency;
      console.log('firstTrainTimeSS');
      var nextArrival = firstTrainTimeSS - current_time;
      var minutesAway = current_time - frequencySS;
      console.log(minutesAway);

      updateTable(trainNameSS, newDestinationSS, frequencySS, nextArrival, minutesAway)

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


// ---- building the table ---- //

var tableID = $('#addRow');

function updateTable(trainNameSS, destination,frequency, nextArrival, minutesAway) {


  var rTag = $('<tr>');

  var tableTrainName = $('<td>');
  tableTrainName.text(trainNameSS);

  var tableDestination = $('<td>');
  tableDestination.text(destination);

  var tableFrequency = $('<td>')
  tableFrequency.text(frequency);

  var tableNextArrival = $('<td>')
  tableNextArrival.text(nextArrival);

  var tableMinutesAway = $('<td>')
  tableMinutesAway.text(minutesAway);

  rTag.append(tableTrainName);
  rTag.append(tableDestination);
  rTag.append(tableFrequency);
  rTag.append(tableNextArrival);
  rTag.append(tableMinutesAway);
  tableID.append(rTag)

}
