import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const day = weekday[currentDate.getDay()];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn ABC 123</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Alphabets")}
      >
        <Text style={styles.buttonText}>Alphabets - A B C ...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Numbers")}
      >
        <Text style={styles.buttonText}>Numbers - 1 2 3 ...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Text style={styles.buttonText}>
          Calendar - {formattedDate} , {day}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
{
  /* <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate("temp")}
>
  <Text style={styles.buttonText}>Temp Testing</Text>
</TouchableOpacity> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
  title: {
    top: 10,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 200,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});
