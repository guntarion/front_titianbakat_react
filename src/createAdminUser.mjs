import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "./firebase.mjs"; // Adjust the path to your firebase.js

const createAdminUser = async (email, password) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get Firestore instance
    const db = getFirestore();

    // Set the user document with the role 'admin'
    await setDoc(doc(db, "users", user.uid), {
      email,
      role: "admin"
    });

    console.log("Admin user created successfully:", user);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

// Example usage
createAdminUser("guntarion@gmail.com", "bismillahi");
