import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { playNumberSound } from "../utils/PlayNumberSound";
import DynamicNumberSelector from "../utils/placeSelectorHelper";
import slowImg from "../assets/slow_audio.png";
import buttonStyles from "../styles/buttons";

const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
const COLUMN_COUNT = 10;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function NumbersScreen() {
  const [slowAudio, setSlowAudio] = useState(false);
  const [sound, setSound] = useState();
  const [showGrid, setShowGrid] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState("Hundreds");
  const [ReturnedNumber, setReturnedNumber] = useState("");

  const handleNumberChange = (newNumber) => {
    setReturnedNumber(newNumber);
  };

  const placeValues = ["Hundreds", "Thousands", "Lakhs"];
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
              onPress={() => playNumberSound(number, slowAudio, sound)}
            >
              <Text style={styles.numberText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return columns;
  };

  const commaSeparated = (num) => {
    if (num < 1000) {
      return num.toString();
    } else if (num >= 1000 && num <= 99999) {
      return num.toLocaleString("en-IN"); // 'en-IN' for Indian numbering, use 'en-US' for US style
    } else if (num >= 100000 && num < 10000000) {
      return num.toLocaleString("en-IN");
    } else if (num >= 10000000) {
      return num.toLocaleString("en-IN");
    }
  };

  return (
    <View style={styles.container}>
      <View style={buttonStyles.buttonContainer}>
        <TouchableOpacity
          style={[buttonStyles.button, showGrid && buttonStyles.activeButton]}
          onPress={() => setShowGrid(true)}
        >
          <Text style={buttonStyles.buttonText}>1 - 100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[buttonStyles.button, !showGrid && buttonStyles.activeButton]}
          onPress={() => setShowGrid(false)}
        >
          <Text style={buttonStyles.buttonText}>0 - 99,99,999</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[buttonStyles.slow, slowAudio && buttonStyles.activeSlow]}
          onPress={toggleSpeed}
        >
          <Image source={slowImg} style={buttonStyles.slowImage} />
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
              <DynamicNumberSelector
                placeValue="Hundreds"
                numberReturnFunction={handleNumberChange}
              />
            )}
            {selectedPlace === "Thousands" && (
              <DynamicNumberSelector
                placeValue="Thousands"
                numberReturnFunction={handleNumberChange}
              />
            )}
            {selectedPlace === "Lakhs" && (
              <DynamicNumberSelector
                placeValue="Lakhs"
                numberReturnFunction={handleNumberChange}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <Text style={styles.numberText}>
              {commaSeparated(ReturnedNumber)}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.numberBox}
              onPress={() => playNumberSound(ReturnedNumber, slowAudio, sound)}
            >
              <Text style={styles.numberText}>{ReturnedNumber}</Text>
            </TouchableOpacity>
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
  columnsContainer: {
    flexDirection: "row",
  },
  column: {
    width: SCREEN_WIDTH * 0.18,
    marginRight: 2,
  },
  numberBox: {
    height: 75,
    paddingHorizontal: 5,
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
