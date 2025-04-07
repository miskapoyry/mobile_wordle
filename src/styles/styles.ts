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
  }
})