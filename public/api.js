// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCwzvhGZlpxlVV32iMO6m9eL0fAsRiRisU",
	authDomain: "tlrca-75fc9.firebaseapp.com",
	projectId: "tlrca-75fc9",
	storageBucket: "tlrca-75fc9.appspot.com",
	messagingSenderId: "841216398641",
	appId: "1:841216398641:web:b2a4253470657a117f0c10",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();

const COLLECTION_NAME = "classroom";

function getCourses() {
	// Reference to Firestore collection
	const collection = firestore.collection(COLLECTION_NAME);
	// Get data from the collection
	return new Promise((resolve, reject) => {
		const unsubscribe = collection.onSnapshot((snapshot) => {
			unsubscribe();
			resolve(
				snapshot.docs.map((doc) => {
					return { Id: doc.id, ...doc.data() };
				})
			);
		});
	});
}

function addCourse(date, classroom, course, sections, teacher) {
	// Data to be written
	const data = {
		Date: date,
		Classroom: classroom,
		Course: course,
		Sections: sections,
		Teacher: teacher,
	};
	// Add data to the document
	return firestore.collection(COLLECTION_NAME).add(data);
}

function deleteCourse(documentId) {
	// Reference to the document you want to delete
	const documentRef = firestore.collection(COLLECTION_NAME).doc(documentId);
	// Delete the document
	return documentRef.delete();
}

export { auth, getCourses, addCourse, deleteCourse };
