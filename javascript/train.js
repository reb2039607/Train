// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCadCUMSmvitqcibC-nbBk2pO4r3G7hE-A",
    authDomain: "train-scheduler-15d2b.firebaseapp.com",
    databaseURL: "https://train-scheduler-15d2b.firebaseio.com",
    projectId: "train-scheduler-15d2b",
    storageBucket: "",
      };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();

  $("#button").on("click", function(event) {
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
  console.log(newTrain.firstTrain);
  console.log(newTrain.dest);
  console.log(newTrain.freq);

  alert("Train will be arriving soon!");

  $("#trainName-input").val("");
  $("#destination-input").val("")
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
  
  });
  