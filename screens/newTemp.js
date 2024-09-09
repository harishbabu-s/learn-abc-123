// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Animated } from "react-native";

// const SlotMachine = () => {
//   const [slotValues, setSlotValues] = useState([0, 0, 0]);
//   const [spinAnimation, setSpinAnimation] = useState(new Animated.Value(0));

//   useEffect(() => {
//     const spinInterval = setInterval(() => {
//       setSlotValues([
//         Math.floor(Math.random() * 10),
//         Math.floor(Math.random() * 10),
//         Math.floor(Math.random() * 10),
//       ]);
//     }, 100);

//     Animated.timing(spinAnimation, {
//       toValue: 1,
//       duration: 2000,
//       useNativeDriver: true,
//     }).start(() => {
//       setSpinAnimation(new Animated.Value(0));
//       clearInterval(spinInterval);
//     });

//     return () => clearInterval(spinInterval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.slotContainer,
//           {
//             transform: [
//               {
//                 rotateX: spinAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: ["0deg", "1080deg"],
//                 }),
//               },
//             ],
//           },
//         ]}
//       >
//         {slotValues.map((value, index) => (
//           <View key={index} style={styles.slotItem}>
//             <Text style={styles.slotValue}>{value}</Text>
//           </View>
//         ))}
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   slotContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   slotItem: {
//     width: 100,
//     height: 100,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginHorizontal: 10,
//     borderRadius: 10,
//   },
//   slotValue: {
//     fontSize: 48,
//     fontWeight: "bold",
//   },
// });

// export default SlotMachine;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { View, ScrollView, Text, StyleSheet } from "react-native";

// const NumberSelector = () => {
//   const [selectedNumber, setSelectedNumber] = useState(0);

//   const handleScroll = (event) => {
//     const { contentOffset } = event.nativeEvent;
//     const currentIndex = Math.round(contentOffset.y / 100);
//     setSelectedNumber(currentIndex);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentContainer}
//         onScroll={handleScroll}
//         snapToInterval={1000}
//         snapToAlignment="center"
//         decelerationRate="fast"
//         bounces={false}
//       >
//         {Array.from({ length: 10 }, (_, i) => i).map((number) => (
//           <View key={number} style={styles.numberItem}>
//             <Text
//               style={[
//                 styles.numberText,
//                 number === selectedNumber ? styles.selectedNumber : null,
//               ]}
//             >
//               {number}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>
//       <Text style={styles.selectedNumberText}>
//         Selected Number: {selectedNumber}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#000",
//   },
//   scrollView: {
//     width: "100%",
//     height: 300,
//   },
//   contentContainer: {
//     paddingVertical: 50,
//   },
//   numberItem: {
//     height: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   numberText: {
//     fontSize: 48,
//     color: "#fff",
//   },
//   selectedNumber: {
//     fontWeight: "bold",
//     color: "#ff0",
//   },
//   selectedNumberText: {
//     marginTop: 20,
//     fontSize: 24,
//     color: "#fff",
//   },
// });

// export default NumberSelector;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { View, ScrollView, Text, StyleSheet } from "react-native";

// const ScrollableNumberSelector = () => {
//   const [selectedNumber, setSelectedNumber] = useState([0, 0, 0, 0, 0]);

//   const handleScroll = (index, event) => {
//     const { contentOffset } = event.nativeEvent;
//     const currentIndex = Math.round(contentOffset.y / 100);
//     const updatedNumber = [...selectedNumber];
//     updatedNumber[index] = currentIndex;
//     setSelectedNumber(updatedNumber);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.numberContainer}>
//         {selectedNumber.map((_, index) => (
//           <ScrollView
//             key={index}
//             style={styles.scrollView}
//             contentContainerStyle={styles.contentContainer}
//             onScroll={(event) => handleScroll(index, event)}
//             snapToInterval={100}
//             snapToAlignment="top"
//             decelerationRate="fast"
//             bounces={false}
//           >
//             {Array.from({ length: 10 }, (_, i) => i).map((number) => (
//               <View key={number} style={styles.numberItem}>
//                 <Text
//                   style={[
//                     styles.numberText,
//                     number === selectedNumber[index]
//                       ? styles.selectedNumber
//                       : null,
//                   ]}
//                 >
//                   {number}
//                 </Text>
//               </View>
//             ))}
//           </ScrollView>
//         ))}
//       </View>
//       <Text style={styles.selectedNumberText}>
//         Selected Number: {selectedNumber.join("")}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#000",
//   },
//   numberContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   scrollView: {
//     width: 100,
//     height: 200,
//     marginHorizontal: 10,
//   },
//   contentContainer: {
//     paddingVertical: 50,
//   },
//   numberItem: {
//     height: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   numberText: {
//     fontSize: 48,
//     color: "#fff",
//   },
//   selectedNumber: {
//     fontWeight: "bold",
//     color: "#ff0",
//   },
//   selectedNumberText: {
//     fontSize: 24,
//     color: "#fff",
//   },
// });

// export default ScrollableNumberSelector;

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
  const [numDigits, setNumDigits] = useState(placeValueNos);
  const [selectedNumber, setSelectedNumber] = useState(
    Array(numDigits).fill(0)
  );

  const handleScroll = (index, event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.y / 100);
    const updatedNumber = [...selectedNumber];
    updatedNumber[index] = currentIndex;
    setSelectedNumber(updatedNumber);
  };

  const handleNumDigitsChange = (text) => {
    const newNumDigits = parseInt(text) || 0;
    setNumDigits(newNumDigits);
    setSelectedNumber(Array(newNumDigits).fill(0));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Digits:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={numDigits.toString()}
          onChangeText={handleNumDigitsChange}
        />
      </View>
      <View style={styles.numberContainer}>
        {Array.from({ length: numDigits }, (_, index) => index).map((index) => (
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
        ))}
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
