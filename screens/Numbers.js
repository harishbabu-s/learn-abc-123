// screens/NumbersScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";

import { numberSounds } from "../utils/AudioMappings";
import { DynamicNumberSelector } from "../utils/placeSelectorHelper";

const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
const COLUMN_COUNT = 10;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function NumbersScreen() {
  const [slowAudio, setSlowAudio] = useState(false);
  const [sound, setSound] = useState();
  const [showGrid, setShowGrid] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState("Hundreds");

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playNumberSound(number) {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const playAudioFile = async (fileNumber) => {
        if (!numberSounds[fileNumber]) {
          throw new Error(`Sound file not found for number: ${fileNumber}`);
        }
        const { sound: newSound } = await Audio.Sound.createAsync(
          numberSounds[fileNumber]
        );
        await newSound.setRateAsync(slowAudio ? 0.3 : 1, true);
        await newSound.playAsync();

        // await new Promise((resolve) => {
        //   newSound.setOnPlaybackStatusUpdate((status) => {
        //     if (status.didJustFinish) {
        //       // newSound.setOnPlaybackStatusUpdate(null);
        //       resolve();
        //     }
        //   });
        //   // newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        // });

        // let status = await newSound.getStatusAsync();
        // while (!status.didJustFinish) {
        //   await new Promise((resolve) => setTimeout(resolve, 100));
        //   status = await newSound.getStatusAsync();
        // }
        // await newSound.unloadAsync();

        await new Promise((resolve) =>
          setTimeout(resolve, slowAudio ? 4000 : 1500)
        );
        await newSound.unloadAsync();
      };

      // if (
      //   number <= 20 ||
      //   number === 30 ||
      //   number === 40 ||
      //   number === 50 ||
      //   number === 60 ||
      //   number === 70 ||
      //   number === 80 ||
      //   number === 90 ||
      //   number === 100
      // ) {
      //   await playAudioFile(number);
      // } else {
      //   const tens = Math.floor(number / 10) * 10;
      //   const ones = number % 10;
      //   await playAudioFile(tens);
      //   if (ones !== 0) {
      //     await playAudioFile(ones);
      //   }
      // }
      if (number <= 20) {
        await playAudioFile(number);
      } else if (number < 100) {
        const tensDigit = Math.floor(number / 10) * 10;
        const onesDigit = number % 10;
        await playAudioFile(tensDigit);
        if (onesDigit !== 0) {
          await playAudioFile(onesDigit);
        }
      } else {
        await playAudioFile(100);
      }
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

  const renderNumberColumns = () => {
    const columns = [];
    for (let i = 0; i < COLUMN_COUNT; i++) {
      const columnNumbers = numbers.slice(
        i * COLUMN_COUNT,
        (i + 1) * COLUMN_COUNT
      );
      columns.push(
        <View key={i} style={styles.column}>
          {columnNumbers.map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.numberBox}
              onPress={() => playNumberSound(number)}
            >
              <Text style={styles.numberText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return columns;
  };

  // const renderPlaceValueSelector = () => (
  //   <ScrollView style={styles.placeValueSelector}>
  //     {digitOptions.map((digit) => (
  //       <TouchableOpacity
  //         key={digit}
  //         style={styles.digitBox}
  //         onPress={() => playNumberSound(digit)}
  //       >
  //         <Text style={styles.digitText}>{digit}</Text>
  //       </TouchableOpacity>
  //     ))}
  //   </ScrollView>
  // );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, showGrid && styles.activeButton]}
          onPress={() => setShowGrid(true)}
        >
          <Text style={styles.buttonText}>1 - 100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !showGrid && styles.activeButton]}
          onPress={() => setShowGrid(false)}
        >
          <Text style={styles.buttonText}>0 - 99,99,999</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, slowAudio && styles.activeButton]}
          onPress={toggleSpeed}
        >
          <Text style={styles.buttonText}>Slow</Text>
        </TouchableOpacity>
      </View>

      {showGrid ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.columnsContainer}>{renderNumberColumns()}</View>
        </ScrollView>
      ) : (
        <View>
          <View style={styles.placeButtonContainer}>
            {placeValues.map((place) => (
              <TouchableOpacity
                key={place}
                style={[
                  styles.placeButton,
                  selectedPlace === place && styles.activePlaceButton,
                ]}
                onPress={() => setSelectedPlace(place)}
              >
                <Text style={styles.placeButtonText}>
                  {place === "Hundreds"
                    ? "Hundreds 100s"
                    : place === "Thousands"
                    ? "Thousands 1000s"
                    : place === "Lakhs"
                    ? "Lakhs 100000s"
                    : " "}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.placeValueContainer}>
            {selectedPlace === "Hundreds" && (
              // <>{DynamicNumberSelector("Hundreds")}</>
              <DynamicNumberSelector />
            )}
            {selectedPlace === "Thousands" && (
              <>
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
              </>
            )}
            {selectedPlace === "Lakhs" && (
              <>
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
              </>
            )}
          </View>
        </View>
      )}
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
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontSize: 32,
  },
  columnsContainer: {
    flexDirection: "row",
  },
  column: {
    width: SCREEN_WIDTH * 0.18,
    marginRight: 2,
  },
  numberBox: {
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 2,
  },
  numberText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  placeButtonContainer: {
    marginTop: 100,
    flexDirection: "row",
    marginBottom: 50,
  },
  placeButton: {
    backgroundColor: "skyblue",
    padding: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    borderRadius: 5,
  },
  activePlaceButton: {
    backgroundColor: "lightgreen",
  },
  placeButtonText: {
    color: "black",
    fontSize: 24,
    textAlign: "center",
  },
  placeValueContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  placeValueSelector: {
    height: 180,
    width: 60,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 5,
  },
  digitBox: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  digitText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
