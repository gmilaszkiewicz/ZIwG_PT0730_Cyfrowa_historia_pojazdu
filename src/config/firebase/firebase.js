import app from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBLazr2S7obtz27fVtCbRAX8nfa3Zam2w8",
  authDomain: "cyfrowa-historia-pojazdu.firebaseapp.com",
  databaseURL: "https://cyfrowa-historia-pojazdu.firebaseio.com",
  projectId: "cyfrowa-historia-pojazdu",
  storageBucket: "cyfrowa-historia-pojazdu.appspot.com",
  messagingSenderId: "612644941968"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  md5 = require("md5");

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Car API ***

  user = uid => this.db.ref(`usersdata/${uid}`);

  userCars = userId => {
    return this.db.ref(`users/${userId}`);
  };

  addCar = (name, values, userId) => {
    const md5Name = this.md5(name);
    this.db
      .ref(`users/${userId}/cars`)
      .child(md5Name)
      .set(values);
  };

  addFix = (name, values, userId, category) => {
    let newCategory = "";
    if (category === "Fix") {
      newCategory = "fixex";
    } else newCategory = "damages";
    if (values) {
      const md5Name = this.md5(name);
      this.db
        .ref(`users/${userId}/cars/${md5Name}`)
        .child(`${newCategory}`)
        .push()
        .set(values);
    }
  };

  fixCategories = () => this.db.ref("fixCategories");

  damageCategories = () => this.db.ref("damageCategories");
}

export default Firebase;
