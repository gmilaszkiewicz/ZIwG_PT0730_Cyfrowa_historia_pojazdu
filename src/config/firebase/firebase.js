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

const appendZeroBefore = number => {
  return (number<=9)? "0" + number: number
}

const dateToString = date => {
  return appendZeroBefore(date.getDate()) + "-" + appendZeroBefore((date.getMonth()+1)) + "-" + date.getFullYear()
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  md5 = require("md5");

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Car API ***

  user = uid => {
   return this.db.ref(`users/${uid}`);
  }

  services = () => {
    return this.db.ref(`services/`);
  }

  addService = (name) => {
    return this.db.ref(`services/${name}`)
  }

  userCars = userId => {
    return this.db.ref(`users/${userId}`);
  };

  addCar = (name, values, userId, data) => {
    const md5Name = this.md5(name);
    values.registerTime = dateToString(values.registerTime)
    this.db
      .ref(`users/${userId}/cars`)
      .child(md5Name)
      .set(values);
      
    this.db
      .ref(`users/${userId}/cars/${md5Name}`)
      .child("data")
      .set(data);
  };

  addFix = (name, values, userId, category) => {
    let newCategory = "";
    if (category === "Fix") {
      newCategory = "fixes";
    } else newCategory = "damages";
    if (values) {
      const md5Name = this.md5(name);
      values.dateTime = dateToString(values.dateTime)
      this.db
        .ref(`users/${userId}/cars/${md5Name}`)
        .child(`${newCategory}`)
        .push()
        .set(values);
    }
  };

  fixCategories = () => this.db.ref("fixCategories");

  damageCategories = () => this.db.ref("damageCategories");

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (dbUser && !dbUser.role) {
              dbUser.role = "";
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
