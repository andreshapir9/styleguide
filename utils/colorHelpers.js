/**
 * ColorHelpers.js
 * 
 * Set of functions to deal with color
 */
// https://color.adobe.com/create/color-wheel
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Appearance } from 'react-native';


// Well for the Triad for example you could convert your color to HSV, then just +/-120 degrees on the hue to get the other two colors. For your other scheme you could do the same but just +/- something small like 15 degrees. The conversion to/from HSV you can perform pretty easily.
class SG_Color {
  constructor(red, green, blue) {
    this.r = red;
    this.g = green;
    this.b = blue;
  }
  RGB() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }
  blue() {
    return "blue"
  }
  ComplementaryColor() {
    return `rgb(${255 - this.r}, ${255 - this.g}, ${255 - this.b})`
  }
}

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "aliceblue",
    color: [0, 0, 255],
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "antiquewhite",
    color: [255, 0, 0],
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "aqua",
    color: [0, 255, 0]
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <>
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  </>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    let sg1 = new SG_Color(item.color[0], item.color[1], item.color[2])
    const bgColor = sg1.RGB()
    const color = "black"
    const compColor = sg1.ComplementaryColor()
    return (
      <>
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor: bgColor }}
          textColor={{ color }}
        />
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor: compColor }}
          textColor={{ color }}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#1A1A1A'
  },
  item: {
    padding: 50,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;