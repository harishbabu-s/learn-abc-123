import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { calendar } from "../utils/AudioMappings";
import slowImg from "../assets/slow_audio.png";
import buttonStyles from "../styles/buttons";

enableScreens();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const days = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
const years = Array.from({ length: 100 }, (_, i) => String(1970 + i));

export default function CalendarScreen() {
  const currentDate = new Date();

  const [activeSection, setActiveSection] = useState("months");
  const [slowAudio, setSlowAudio] = useState(false);
  const [sound, setSound] = useState();
  const [selectedDate, setSelectedDate] = useState({
    day: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });

  async function playSound(section, atribute) {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      if (!calendar[section][atribute]) {
        throw new Error(`Sound file not found for ${atribute}`);
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        calendar[section][atribute]
      );
      await newSound.setRateAsync(slowAudio ? 0.3 : 1, true);
      await newSound.playAsync();

      await new Promise((resolve) =>
        setTimeout(resolve, slowAudio ? 4000 : 1500)
      );
      await newSound.unloadAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
      Alert.alert(
        "Error",
        "There was an error playing the sound. Please try again."
      );
    }
  }

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

  const spellWord = (word) => {
    // Implement spelling logic here
    console.log(`Spelling ${word}`);
  };

  const playAlternateLanguage = (word) => {
    console.log(`Playing ${word} in alternate language`);
  };

  const renderItem = ({ section, item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[styles.itemButton, styles.item]}
        onPress={() => playSound(section, item.toLowerCase())}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.spellButton, styles.item]}
        onPress={() => spellWord(item)}
      >
        <Text style={styles.itemText}>Spell</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.languageButton, styles.item]}
        onPress={() => playAlternateLanguage(item)}
      >
        <Text style={styles.itemText}>తెలుగు</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDateSelector = () => (
    <View style={styles.dateContainer}>
      <ScrollView style={styles.dateSelector}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={styles.dateItem}
            onPress={() => setSelectedDate({ ...selectedDate, day })}
          >
            <Text style={styles.dateText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.dateSelector}>
        {months.map((month, index) => (
          <TouchableOpacity
            key={month}
            style={styles.dateItem}
            onPress={() =>
              setSelectedDate({
                ...selectedDate,
                month: String(index + 1).padStart(2, "0"),
              })
            }
          >
            <Text style={styles.dateText}>
              {String(index + 1).padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.dateSelector}>
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            style={styles.dateItem}
            onPress={() => setSelectedDate({ ...selectedDate, year })}
          >
            <Text style={styles.dateText}>{year}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={buttonStyles.buttonContainer}>
          <TouchableOpacity
            style={[
              buttonStyles.button,
              activeSection === "months" && buttonStyles.activeButton,
            ]}
            onPress={() => setActiveSection("months")}
          >
            <Text style={buttonStyles.buttonText}>Months</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              buttonStyles.button,
              activeSection === "weeks" && buttonStyles.activeButton,
            ]}
            onPress={() => setActiveSection("weeks")}
          >
            <Text style={buttonStyles.buttonText}>Weeks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              buttonStyles.button,
              activeSection === "date" && buttonStyles.activeButton,
            ]}
            onPress={() => setActiveSection("date")}
          >
            <Text style={buttonStyles.buttonText}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[buttonStyles.slow, slowAudio && buttonStyles.activeSlow]}
            onPress={toggleSpeed}
          >
            <Image source={slowImg} style={buttonStyles.slowImage} />
          </TouchableOpacity>
        </View>

        {activeSection === "months" && (
          <FlatList
            data={months}
            renderItem={(item) => renderItem({ section: "month", ...item })}
            keyExtractor={(item) => item}
          />
        )}

        {activeSection === "weeks" && (
          <FlatList
            data={weekdays}
            renderItem={(item) => renderItem({ section: "week", ...item })}
            keyExtractor={(item) => item}
          />
        )}

        {activeSection === "date" && (
          <View>
            {renderDateSelector()}
            <TouchableOpacity
              style={styles.readDateButton}
              onPress={() =>
                playSound(
                  `date_${selectedDate.day}_${selectedDate.month}_${selectedDate.year}`
                )
              }
            >
              <Text style={styles.buttonText}>
                Read Date: {selectedDate.day}/{selectedDate.month}/
                {selectedDate.year}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Text>Note : Spell, తెలుగు and Date section not implemented.</Text>
          <Text>Will be comming soon in version 2</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  itemButton: {
    flex: 2,
    backgroundColor: "#dddddd",
  },
  spellButton: {
    flex: 1,
    backgroundColor: "#4CAF00",
  },
  languageButton: {
    backgroundColor: "#FF9800",
  },
  itemText: {
    fontSize: 24,
    padding: 3,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateSelector: {
    height: 200,
    width: 100,
    backgroundColor: "#f0f0f0",
  },
  dateItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
  },
  readDateButton: {
    backgroundColor: "#9C27B0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  noteStatement: {
    fontSize: "bold",
  },
});
