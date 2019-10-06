// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyCadCUMSmvitqcibC-nbBk2pO4r3G7hE-A",
  authDomain: "train-scheduler-15d2b.firebaseapp.com",
  databaseURL: "https://train-scheduler-15d2b.firebaseio.com",
  projectId: "train-scheduler-15d2b",
  storageBucket: "train-scheduler-15d2b.appspot.com",
  messagingSenderId: "151838834780",
  appId: "1:151838834780:web:2d15daa8ae2f534047a699",
  measurementId: "G-L171DT1H3P"
};

// Initialize Firebase
firebase.initializeApp(config);
// firebase.analytics();

const database = firebase.database(); //I have no idea why I'm getting an error here! D:

$("#button").on("click", function (event) {
  event.preventDefault();

  //form input
  const trainName = $("#trainName-input").val().trim();
  const destination = $("#destination-input").val().trim();
  const firstTrainTime = $("#firstTrainTime-input").val().trim();
  const frequency = $("#frequency-input").val().trim();

  const newTrain = {
    train: trainName,
    dest: destination,
    firstTrain: firstTrainTime,
    freq: frequency
  };

  //sends train info to firebase
  database.ref().push(newTrain);

  console.log(newTrain.train);
  console.log(newTrain.dest);
  console.log(newTrain.firstTrain);
  console.log(newTrain.freq);

  alert("Train will be arriving soon!");

  $("#trainName-input").val("");
  $("#destination-input").val("")
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");

});

//adding train to Firebase 
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  const trainName = childSnapshot.val().train;
  const destination = childSnapshot.val().dest;
  const firstTrainTime = childSnapshot.val().firstTrain;
  const frequency = childSnapshot.val().freq;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);


  //moment.js time stuff
  let tFrequency = frequency;

  let firstTime = firstTrainTime;

  //First Time (pushed back 1 year to make sure it comes before current time)
  let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  //current time
  let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
let tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
let tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
let nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  //appending it all, not sure why it doesn't append...


  let newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrainTime),
    $("<td>").text(frequency)
  );

  $("#train-schedule > tbody").append(newRow);
});