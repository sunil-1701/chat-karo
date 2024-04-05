import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// config data for firebase. This section can be pulic
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSANGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialising firebase
firebase.initializeApp(firebaseConfig);

// Handling Authentication Methods
export const auth = firebase.auth();

// Selecting google for authentication
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = async () => {
  const { user } = await auth.signInWithPopup(googleProvider);

  // returning the userAuth
  return user;
};

// checking user session in a promise based syntax as required by the redux-sagas
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      // stop listenning to firestore the moment userAuth is get
      unsubscribeFromAuth();
      resolve(userAuth);
    }, reject);
  });
};

// Handling Firestore Storage
export const firestore = firebase.firestore();

// Function to create document of users in the firestore storage

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // do nothing if the authentication state is null
  if (!userAuth) return;

  // adding the data to firebase
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL, uid } = userAuth;

    // getting time from firebase servers to maintain uniformity
    const createdAt = firebase.firestore.Timestamp.now();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        uid,
        createdAt,
        authorisedChatRooms: [],
        adminOfChatRooms: [],
        messagesSent: [],
      });
    } catch (error) {
      console.log("Error Creating User", error);
    }
  }

  // Returning userRef for accessability
  return userRef;
};

// Hendling chatrooms

// Add Chatroom

export const createChatroomDocument = async (chatRoom) => {
  if (!chatRoom) return;

  // creating batch for transactions;

  const batch = firestore.batch();
  const chatroomRef = firestore.collection("chatrooms").doc();
  const messageRef = firestore.collection("messages").doc(chatroomRef.id);

  try {
    // getting server time for an internet synchronised time
    const createdAt = firebase.firestore.Timestamp.now();
    // returning a new reference in the chatrooms collection

    batch.set(chatroomRef, {
      ...chatRoom,
      createdAt,
      chatroomId: chatroomRef.id,
    });

    // creating message document for the chatroom

    batch.set(messageRef, {
      messages: [],
      chatroomId: chatroomRef.id,
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }

  // // returning a new reference in the chatrooms collection
  // const chatroomRef = firestore.collection("chatrooms").doc();

  // // creating message document for the chatroom

  // const messageRef = firestore.collection("messages").doc(chatroomRef.id);

  // // getting server time for an internet synchronised time
  // const createdAt = firebase.firestore.Timestamp.now();
  // try {
  //   await chatroomRef.set({
  //     ...chatRoom,
  //     createdAt,
  //     chatroomId: chatroomRef.id,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

  return chatroomRef;
};

// fetching Chatrooms
export const firebaseFetchChatRoom = async (chatroom) => {
  const chatroomRef = firestore.collection("chatrooms").doc(chatroom);
  const snapShot = await chatroomRef.get();
  if (snapShot.exists) {
    const data = snapShot.data();
    return data;
  }
};

export default firebase;
