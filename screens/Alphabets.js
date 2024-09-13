// screens/AlphabetsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import { enableScreens } from "react-native-screens";

import { alphabetSounds, smallSound } from "../utils/AudioMappings";
import slowImg from "../assets/slow_audio.png";
import buttonStyles from "../styles/buttons";

enableScreens();

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetsScreen() {
  const [showUppercase, setShowUppercase] = useState(true);
  const [slowAudio, setSlowAudio] = useState(false);
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound(letter) {
    try {
      const letterLower = letter.toLowerCase();

      if (sound) {
        await sound.unloadAsync();
      }

      if (!showUppercase) {
        if (!smallSound) {
          throw new Error("Small sound file not found");
        }
        const { sound: small } = await Audio.Sound.createAsync(smallSound);
        await small.setRateAsync(slowAudio ? 0.5 : 1, true);
        await small.playAsync();
        await new Promise((resolve) =>
          setTimeout(resolve, slowAudio ? 2000 : 900)
        );
        await small.unloadAsync();
      }

      if (!alphabetSounds[letterLower]) {
        throw new Error(`Sound file not found for letter: ${letterLower}`);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        alphabetSounds[letterLower]
      );
      setSound(newSound);

      await newSound.setRateAsync(slowAudio ? 0.5 : 1, true);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
      Alert.alert(
        "Error",
        "There was an error playing the sound. Please try again."
      );
    }
  }

  const toggleSpeed = () => {
    setSlowAudio(!slowAudio);
  };

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
      <View style={buttonStyles.buttonContainer}>
        <TouchableOpacity
          style={[
            buttonStyles.button,
            showUppercase && buttonStyles.activeButton,
          ]}
          onPress={() => setShowUppercase(true)}
        >
          <Text style={buttonStyles.buttonText}>ABCD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            buttonStyles.button,
            !showUppercase && buttonStyles.activeButton,
          ]}
          onPress={() => setShowUppercase(false)}
        >
          <Text style={buttonStyles.buttonText}>abdc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[buttonStyles.slow, slowAudio && buttonStyles.activeSlow]}
          onPress={toggleSpeed}
        >
          <Image source={slowImg} style={buttonStyles.slowImage} />
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
  alphabetContainer: {
    alignItems: "center",
  },
  alphabetBox: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    margin: 5,
    borderRadius: 10,
  },
  alphabetText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
