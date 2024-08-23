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
  const [activeSection, setActiveSection] = useState(null);
  const [fastAudio, setFastAudio] = useState(false);
  const [sound, setSound] = useState();
  const [selectedDate, setSelectedDate] = useState({
    day: "01",
    month: "01",
    year: "2024",
  });

  async function playSound(fileName) {
    const { sound } = await Audio.Sound
      .createAsync
      //   require(`../assets/calendar/${fileName}.mp3`)
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

  const spellWord = (word) => {
    // Implement spelling logic here
    console.log(`Spelling ${word}`);
  };

  const playAlternateLanguage = (word) => {
    // Implement alternate language audio here
    console.log(`Playing ${word} in alternate language`);
  };

  const renderItem = ({ item, section }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemButton}
        onPress={() => playSound(`${section}_${item.toLowerCase()}`)}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.spellButton}
        onPress={() => spellWord(item)}
      >
        <Text style={styles.buttonText}>Spell</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => playAlternateLanguage(item)}
      >
        <Text style={styles.buttonText}>Alt Lang</Text>
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
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeSection === "months" && styles.activeButton,
          ]}
          onPress={() => setActiveSection("months")}
        >
          <Text style={styles.buttonText}>Months</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeSection === "weeks" && styles.activeButton,
          ]}
          onPress={() => setActiveSection("weeks")}
        >
          <Text style={styles.buttonText}>Weeks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeSection === "date" && styles.activeButton,
          ]}
          onPress={() => setActiveSection("date")}
        >
          <Text style={styles.buttonText}>Date</Text>
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

      {activeSection === "months" && (
        <FlatList
          data={months}
          renderItem={(item) => renderItem({ ...item, section: "month" })}
          keyExtractor={(item) => item}
        />
      )}

      {activeSection === "weeks" && (
        <FlatList
          data={weekdays}
          renderItem={(item) => renderItem({ ...item, section: "weekday" })}
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemButton: {
    flex: 2,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  spellButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  languageButton: {
    flex: 1,
    backgroundColor: "#FF9800",
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
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
});
