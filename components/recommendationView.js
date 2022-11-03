/**
 * recommendationView.js
 * Should be a set of recommendations based off a color selection.
 * Idealy a side scrolling or vertical scrolling list of color blocks from which
 * we're recommending alternatives or complementaries to.
 */
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Appearance } from 'react-native';
import { SG_Color, DATA, HSVTORGB } from "../utils/colorHelpers";
import { toHsv } from 'react-native-color-picker'


const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function RecommendationView({ route }) {
  const [selectedId, setSelectedId] = useState(null);
  var SelectedColor = route.params.SelectedColor
  console.log(route)

  const renderItem = ({ item }) => {
    let sg1 = new SG_Color(item.color[0], item.color[1], item.color[2])
    const bgColor = sg1.RGB()
    const color = "black"
    const compColor = sg1.ComplementaryColor()
    return (
      <>
        <Item
          item={item}
          // onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor: bgColor }}
          textColor={{ color }}
        />
        <Item
          item={item}
          // onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor: compColor }}
          textColor={{ color }}
        />
      </>
    );
  };
  let randvar = Math.floor(Math.random() * 10000)
  DATA.push({ id: "SelectedColor_" + randvar, title: "SelectedColor " + randvar, color: HSVTORGB(SelectedColor.h, SelectedColor.s, SelectedColor.v) });
  console.log(DATA)
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
    backgroundColor: '#121212'
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
