import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const DynamicNumberSelector = ({ placeValue, numberReturnFunction }) => {
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
    const currentIndex = Math.round(contentOffset.y / 70);
    const updatedNumber = [...selectedNumber];
    updatedNumber[index] = currentIndex;
    setSelectedNumber(updatedNumber);
  };

  const joinArrayToNumber = (arr) => {
    const joinedString = arr.join("");
    const number = parseInt(joinedString, 10);
    return isNaN(number) ? 0 : number;
  };
  numberReturnFunction(joinArrayToNumber(selectedNumber));

  return (
    <View style={styles.container}>
      <View style={styles.placeNumberContainer}>
        {Array.from({ length: placeValueNos }, (_, index) => index).map(
          (index) => (
            <ScrollView
              key={index}
              style={styles.scrollView}
              contentContainerStyle={styles.contentContainer}
              onScroll={(event) => handleScroll(index, event)}
              snapToInterval={70}
              snapToAlignment="top"
              decelerationRate="fast"
              bounces={false}
            >
              {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                <View key={number} style={styles.placeNumberItem}>
                  <Text
                    style={[
                      styles.placeNumberText,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeNumberContainer: {
    flexDirection: "row",
    marginBottom: 40,
    borderWidth: 1,
  },
  scrollView: {
    width: 100,
    height: 200,
    marginHorizontal: 4,
  },
  contentContainer: {
    paddingVertical: 60,
  },
  placeNumberItem: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  placeNumberText: {
    fontSize: 48,
    color: "#00000030",
  },
  selectedNumber: {
    fontWeight: "bold",
    color: "#000000",
  },
});

export default DynamicNumberSelector;
