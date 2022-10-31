/**
 * recommendationView.js
 * Should be a set of recommendations based off a color selection.
 * Idealy a side scrolling or vertical scrolling list of color blocks from which
 * we're recommending alternatives or complementaries to.
 */
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Appearance } from 'react-native';
import { SG_Color, DATA } from "../utils/colorHelpers";
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
    const backgroundColor = item.title;
    const color = 'black'

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  DATA.push({ id: SelectedColor, title: SelectedColor, color: SelectedColor });
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
