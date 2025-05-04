import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  backButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    top: 18,
    left: 15,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00112b",
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
    backgroundColor: "#00112b",
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
    top: -245,
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
  input: {
    marginBottom: 10,
  },
  lottieBackground: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: -100
  }
});

export const gameStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#00112b",
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
    marginBottom: 0,
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

export const statisticStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#00112b",
  },
  segmentedButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  progress: {
    marginBottom: 30
  }
})

export const leaderBoardStyle = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  name: {
    flex: 1
  },
  rank: {
    paddingRight: 10,
  },
  row: {
    flexDirection: "row",
    borderColor: "white",
    borderBottomWidth: 1,
    paddingVertical: 10,
  }
})

export const statCardStyle = StyleSheet.create({
  container: {
    backgroundColor: "#0a2239",
    width: 100,
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    shadowColor: "white",
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  title: {
    color: "#D6E4F0",
    fontSize: 12,
    bottom: 10
  },
  line: {
    width: 80,
    backgroundColor: "white",
    height: 1,
    bottom: 8
  },
  amount: {
    fontSize: 20,
    color: "white",
    top: 4
  },
})