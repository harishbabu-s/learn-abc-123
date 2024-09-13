import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
  slow: {
    width: 120,
    alignItems: "center",
    backgroundColor: "#0099ff",
    borderRadius: 5,
  },
  activeSlow: {
    borderRadius: 5,
    backgroundColor: "#00ff99",
  },
  slowImage: {
    paddingHorizontal: 20,
    width: 100,
    height: 50,
  },
});

export default buttonStyles;
