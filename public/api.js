
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwzvhGZlpxlVV32iMO6m9eL0fAsRiRisU",
	authDomain: "tlrca-75fc9.firebaseapp.com",
	projectId: "tlrca-75fc9",
	storageBucket: "tlrca-75fc9.appspot.com",
	messagingSenderId: "841216398641",
	appId: "1:841216398641:web:b2a4253470657a117f0c10"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();


function getCourses(callback) {
    // Reference to Firestore collection
    const collection = firestore.collection('classroom');

    // Real-time listener for Firestore data changes
    collection.onSnapshot((snapshot) => {
        callback(snapshot.docs.map((doc) => { return doc.data() }))
    });
}

export {getCourses}