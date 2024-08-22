import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Audio } from "expo-av";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetsScreen() {
  const [showUppercase, setShowUppercase] = useState(true);
  const [fastAudio, setFastAudio] = useState(false);
  const [sound, setSound] = useState();

  async function playSound(letter) {
    const { sound } = await Audio.Sound
      .createAsync
      //   require(`../assets/alphabets/${letter.toLowerCase()}.aac`)
      ();
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const renderAlphabet = ({ item }) => (
    <TouchableOpacity
      style={styles.alphabetBox}
      onPress={() => playSound(item)}
    >
      <Text style={styles.alphabetText}>
        {showUppercase ? item : item.toLowerCase()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, showUppercase && styles.activeButton]}
          onPress={() => setShowUppercase(true)}
        >
          <Text style={styles.buttonText}>Uppercase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !showUppercase && styles.activeButton]}
          onPress={() => setShowUppercase(false)}
        >
          <Text style={styles.buttonText}>Lowercase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, fastAudio && styles.activeButton]}
          onPress={() => setFastAudio(!fastAudio)}
        >
          <Text style={styles.buttonText}>
            {fastAudio ? "Normal Speed" : "Fast Speed"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={alphabets}
        renderItem={renderAlphabet}
        keyExtractor={(item) => item}
        numColumns={5}
        contentContainerStyle={styles.alphabetContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#0056b3",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  alphabetContainer: {
    alignItems: "center",
  },
  alphabetBox: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    margin: 5,
    borderRadius: 5,
  },
  alphabetText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
