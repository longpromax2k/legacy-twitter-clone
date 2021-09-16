import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // this.$router.push("/home");
  } else {
    // this.$router.push("/");
  }
});
