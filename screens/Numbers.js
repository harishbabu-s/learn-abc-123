// screens/NumbersScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";

const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
const digitOptions = Array.from({ length: 10 }, (_, i) => i);

export default function NumbersScreen() {
  const [showGrid, setShowGrid] = useState(true);
  const [showPlaceValues, setShowPlaceValues] = useState(false);
  const [fastAudio, setFastAudio] = useState(false);
  const [sound, setSound] = useState();
  const [selectedPlace, setSelectedPlace] = useState(null);

  async function playSound(number) {
    const { sound } = await Audio.Sound
      .createAsync
      //   require(`../assets/numbers/${number}.aac`)
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

  const renderNumber = ({ item }) => (
    <TouchableOpacity style={styles.numberBox} onPress={() => playSound(item)}>
      <Text style={styles.numberText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderPlaceValueSelector = (place) => (
    <ScrollView style={styles.placeValueSelector}>
      {digitOptions.map((digit) => (
        <TouchableOpacity
          key={digit}
          style={styles.digitBox}
          onPress={() => playSound(digit)}
        >
          <Text style={styles.digitText}>{digit}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, showGrid && styles.activeButton]}
          onPress={() => {
            setShowGrid(true);
            setShowPlaceValues(false);
          }}
        >
          <Text style={styles.buttonText}>1-100 Grid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, showPlaceValues && styles.activeButton]}
          onPress={() => {
            setShowGrid(false);
            setShowPlaceValues(true);
          }}
        >
          <Text style={styles.buttonText}>Place Values</Text>
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

      {showGrid && (
        <FlatList
          data={numbers}
          renderItem={renderNumber}
          keyExtractor={(item) => item.toString()}
          numColumns={10}
          horizontal
          contentContainerStyle={styles.gridContainer}
        />
      )}

      {showPlaceValues && (
        <View>
          <View style={styles.placeButtonContainer}>
            <TouchableOpacity
              style={[
                styles.placeButton,
                selectedPlace === "hundreds" && styles.activePlaceButton,
              ]}
              onPress={() => setSelectedPlace("hundreds")}
            >
              <Text style={styles.placeButtonText}>Hundreds</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.placeButton,
                selectedPlace === "thousands" && styles.activePlaceButton,
              ]}
              onPress={() => setSelectedPlace("thousands")}
            >
              <Text style={styles.placeButtonText}>Thousands</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.placeButton,
                selectedPlace === "lakhs" && styles.activePlaceButton,
              ]}
              onPress={() => setSelectedPlace("lakhs")}
            >
              <Text style={styles.placeButtonText}>Lakhs</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.placeValueContainer}>
            {selectedPlace === "hundreds" && (
              <>
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
              </>
            )}
            {selectedPlace === "thousands" && (
              <>
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
                {renderPlaceValueSelector()}
              </>
            )}
            {selectedPlace === "lakhs" && (
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
  gridContainer: {
    paddingRight: 20,
  },
  numberBox: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    margin: 5,
    borderRadius: 5,
  },
  numberText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  placeButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  activePlaceButton: {
    backgroundColor: "#0056b3",
  },
  placeButtonText: {
    color: "white",
    fontSize: 14,
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
    fontSize: 24,
    fontWeight: "bold",
  },
});
