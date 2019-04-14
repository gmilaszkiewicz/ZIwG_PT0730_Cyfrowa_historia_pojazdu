import app from 'firebase/app';
import 'firebase/auth';

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
  }

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

}

export default Firebase;