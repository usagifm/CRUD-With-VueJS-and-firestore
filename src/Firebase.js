import * as firebase from 'firebase';


 


const settings = {timestampsInSnapshots: true};


 


const config = {


  apiKey: "AIzaSyDKMLimougpzyO6PLWrg_M3NRISv4NvS4s",

 

  databaseURL: "https://bookstore-8d21b.firebaseio.com",


  projectId: "bookstore-8d21b",




};



firebase.initializeApp(config);


 


firebase.firestore().settings(settings);


 


export default firebase;