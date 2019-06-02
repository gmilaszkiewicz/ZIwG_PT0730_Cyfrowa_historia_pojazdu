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
  return number <= 9 ? "0" + number : number;
};

const dateToString = date => {
  return (
    appendZeroBefore(date.getDate()) +
    "-" +
    appendZeroBefore(date.getMonth() + 1) +
    "-" +
    date.getFullYear()
  );
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

  user = uid => {
    return this.db.ref(`users/${uid}`);
  };

  services = () => {
    return this.db.ref(`services/`);
  };

  addService = name => {
    return this.db.ref(`services/${name}`);
  };

  userCars = userId => {
    return this.db.ref(`users/${userId}`);
  };

  addCar = (name, values, userId, data) => {
    const md5Name = this.md5(name);
    values.registerTime = dateToString(values.registerTime);
    this.db
      .ref(`users/${userId}/cars`)
      .child(md5Name)
      .set(values);

    this.db
      .ref(`users/${userId}/cars/${md5Name}`)
      .child("data")
      .set(data);
  };

  addUserByEmail = (uid, email) => {
    const md5Email = this.md5(email);
    this.db
      .ref(`usersByEmail/`)
      .child(md5Email)
      .set({ uid: uid });
  };

  userByEmail = email => {
    const md5Email = this.md5(email);
    return this.db.ref(`usersByEmail/${md5Email}`);
  };

  addFix = (name, values, ownerInfo, category, user, car) => {
    let newCategory = "";
    console.log(ownerInfo)
    if (category === "Fix") {
      newCategory = "fixes";
    } else newCategory = "damages";
    if (values) {
      const md5Name = this.md5(name);
      values.dateTime = dateToString(values.dateTime);
      if (user.role === "CAR_SERVICE") {
        values = { verified: user.name, ...values };
        this.db
          .ref(`users/${ownerInfo.currentUid}/cars/${md5Name}`)
          .child(`${newCategory}`)
          .push()
          .set(values);
        this.addFixesToServicesHistory(user, ownerInfo.email, category, values,car)
      } else values = { verified: "owner", ...values };
      this.db
        .ref(`users/${ownerInfo.currentUid}/cars/${md5Name}`)
        .child(`${newCategory}`)
        .push()
        .set(values);
    }
  };

  addFixesToServicesHistory = (user, userEmail, category, values,car) => {
    const fixesInfo = {
      userEmail: userEmail,
      carBrand: car.data.brand + " " + car.data.model,
      productionYear: car.data.productionYear,
      category: category,
      price: values.price,
      description: values.description,
      fixedDate: values.dateTime
    }
    // console.log(car)
    // console.log(values)
    // console.log(fixesInfo)
    this.db
    .ref(`users/${user.uid}/createdFixes`)
    .child(`${userEmail}`)
    .push()
    .set(fixesInfo);
  }

  fixCategories = () => this.db.ref("fixCategories");

  damageCategories = () => this.db.ref("damageCategories");

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
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
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
