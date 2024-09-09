import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const NumberSelector = () => {
  const [selectedNumber, setSelectedNumber] = useState("00000");

  // Generates an array of numbers from 0 to 9
  const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

  const renderDigitSelectors = (startIndex) => (
    <View style={styles.selectorContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        snapToInterval={50}
        decelerationRate="fast"
        onScroll={(event) => {
          const yOffset = event.nativeEvent.contentOffset.y;
          const index = Math.round(yOffset / 50);
          const digit = numbers[index % 10];
          const newNumber =
            selectedNumber.substring(0, startIndex) +
            digit +
            selectedNumber.substring(startIndex + 1);
          setSelectedNumber(newNumber);
        }}
      >
        {numbers.map((number, idx) => (
          <View key={idx} style={styles.numberItem}>
            <Text style={styles.numberText}>{number}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.resultText}>
          {selectedNumber.slice(0, 2)},{selectedNumber.slice(0, 2)},
          {selectedNumber.slice(2)}
        </Text>
      </View>

      <View style={styles.selectorWrapper}>
        {renderDigitSelectors(0)}
        {renderDigitSelectors(1)}
        {renderDigitSelectors(2)}
        {renderDigitSelectors(3)}
        {renderDigitSelectors(4)}
        {renderDigitSelectors(5)}
        {renderDigitSelectors(6)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  resultText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  selectorWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectorContainer: {
    width: (width * 0.6) / 7,
    height: 150,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  numberItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  numberText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default NumberSelector;
