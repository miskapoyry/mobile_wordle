import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    flexGrow: 1
  },
  title: {
    textAlign: "center",
    padding: 5,
    fontSize: 40,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    fontSize: 16
  },
  intro: {
    textAlign: "center"
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
    alignItems: 'center',
  },
  button: {
    width: 250,
  },
  profileMenu: {
    position: "absolute",
    top: -240,
    right: 10,
    zIndex: 10,
  },
  profileGreeting: {
    position: "absolute",
    top: -240,
    left: 10,
    zIndex: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileDivider: {
    position: "relative",
    top: -190,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ddd",
  },
  input : {
    marginBottom: 10,
  }
});

export const gameStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  rowed: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  letterContainer: {
    width: 45,
    height: 45,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  letterText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  }
})