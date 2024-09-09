import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native";

const DynamicNumberSelector = (placeValue) => {
  const placeValueNos =
    placeValue === "Hundreds"
      ? 3
      : placeValue === "Thousands"
      ? 5
      : placeValue === "Lakhs"
      ? 7
      : 8;
  //   const [numDigits, setNumDigits] = useState(placeValueNos);
  const [selectedNumber, setSelectedNumber] = useState(
    Array(placeValueNos).fill(0)
  );

  const handleScroll = (index, event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.y / 100);
    const updatedNumber = [...selectedNumber];
    updatedNumber[index] = currentIndex;
    setSelectedNumber(updatedNumber);
  };

  //   const handleNumDigitsChange = (text) => {
  //     const newNumDigits = parseInt(text) || 0;
  //     setNumDigits(newNumDigits);
  //     setSelectedNumber(Array(newNumDigits).fill(0));
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        {Array.from({ length: placeValueNos }, (_, index) => index).map(
          (index) => (
            <ScrollView
              key={index}
              style={styles.scrollView}
              contentContainerStyle={styles.contentContainer}
              onScroll={(event) => handleScroll(index, event)}
              snapToInterval={100}
              snapToAlignment="top"
              decelerationRate="fast"
              bounces={false}
            >
              {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                <View key={number} style={styles.numberItem}>
                  <Text
                    style={[
                      styles.numberText,
                      number === selectedNumber[index]
                        ? styles.selectedNumber
                        : null,
                    ]}
                  >
                    {number}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )
        )}
      </View>
      <Text style={styles.selectedNumberText}>
        Selected Number: {selectedNumber.join("")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    marginRight: 10,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 80,
  },
  numberContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  scrollView: {
    width: 100,
    height: 200,
    marginHorizontal: 10,
  },
  contentContainer: {
    paddingVertical: 50,
  },
  numberItem: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 48,
    color: "#fff",
  },
  selectedNumber: {
    fontWeight: "bold",
    color: "#ff0",
  },
  selectedNumberText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default DynamicNumberSelector;
