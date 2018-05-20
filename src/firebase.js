// import { initializeApp } from 'firebase';

// const app = initializeApp({
const config = ({
  apiKey: "AIzaSyCYCKF5RjBcCGxToVDbInIZ9fMTHCTmiCw",
  authDomain: "kanban-7b046.firebaseapp.com",
  databaseURL: "https://kanban-7b046.firebaseio.com",
  projectId: "kanban-7b046",
  storageBucket: "kanban-7b046.appspot.com",
  messagingSenderId: "1073025458872"
});


export const firebaseApp = firebase.initializeApp(config)
export const db = firebaseApp.database()

// export const db = app.database()
export const kanbansRef = db.ref('kanban')

