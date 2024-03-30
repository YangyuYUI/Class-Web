import { auth, getCourses, addCourse, deleteCourse } from "../api.js"


document.getElementById("signOutButton").onclick = () => {
    auth.signOut().then(() => {
      // Signed out
      console.log("User signed out");
      window.location.href = "index.html";
    });
  };

//   export { createTable };