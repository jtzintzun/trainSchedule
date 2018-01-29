// --Buiding the main Screen--------------------------------------------------------

var current_time = moment().format('HH:mm');
var date = moment().format('MMM Do YY');
var trainNameSS
var newDestinationSS
var firstTrainTimeSS
var frequencySS
var ftt_ct
var nextArrival
var minutesAway
var timeNow



function buildScreen() {
  // $('#mainContainer').empty()

  var div3 = $('<div>');
  div3.attr('id', 'rightContainer');
  $('#containers').append(div3)
  div3.addClass('rightContainerClass')
  div3.addClass('border')
  div3.addClass('col s12 m3 l3')
  $('#rightContainer').html('<h3>' + 'Add Train' + '</h3>');

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

  $('#clock').html('<h4>' + timeNow + '</h4>');
  $('#date').html('<h5>' + date + '</h5>');

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
  frequency = $('#frequency').val().trim();
  console.log(firstTrainTime);
  console.log(frequency);
// Change what is saved in firebase

database.ref().push({
   trainName: trainName,
   newDestination: newDestination,
   firstTrainTime: firstTrainTime,
   frequency: frequency
 });
$('#div3').empty()
buildScreen()

}); // end On click event

function Snapshot(){

 database.ref().on("child_added", function(childSnapshot) {

      trainNameSS = childSnapshot.val().trainName;
      newDestinationSS = childSnapshot.val().newDestination;
      firstTrainTimeSS = moment(childSnapshot.val().firstTrainTime,'HH:mm');
      frequencySS = childSnapshot.val().frequency;

      time()

      updateTable(trainNameSS, newDestinationSS, frequencySS, nextArrival, minutesAway)

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

}

//---update the table every 60 seconds ---//
function minute(){
    current_time = moment()
    $('#addRow').empty()
    Snapshot()
    time()
    timeNow = moment().format('HH:mm');
    $('#clock').html('<h4>' + timeNow + '</h4>');
    $('#date').html('<h5>' + date + '</h5>');
    setTimeout("minute()", 60000);
}


// ---- building the table ---- //

function updateTable(trainNameSS, destination,frequency, nextArrival, minutesAway) {
console.log('updateTable');
  var tableID = $('#addRow');
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

//--- Calculating the next arrival and minutes away ----//

function time(){

if (current_time > firstTrainTimeSS) {
  var ftt_ct = current_time.diff(firstTrainTimeSS, "minutes");
} else {
  var ftt_ct = (current_time.diff(firstTrainTimeSS, "minutes"))* -1;
}
  var temp = Math.trunc(ftt_ct/frequencySS)
  temp2 = (temp*frequencySS)
  temp3 = (ftt_ct-temp2)
  minutesAway = frequencySS - temp3
  nextArrival = moment().add(minutesAway, 'm');
  nextArrival = moment(nextArrival).format('HH:mm')
}

minute()
