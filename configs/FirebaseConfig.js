import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVxsx84eSJcHvo_y2R3WmnLJBPlGLHlHc",
  authDomain: "travel-planner-app-eae72.firebaseapp.com",
  projectId: "travel-planner-app-eae72",
  storageBucket: "travel-planner-app-eae72.appspot.com",
  messagingSenderId: "742026627847",
  appId: "1:742026627847:web:f2df2c1b46c2a3f9e753a2",
  measurementId: "G-85BJ74J5FW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);