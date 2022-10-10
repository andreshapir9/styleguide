/**
 * recommendationView.js
 * Should be a set of recommendations based off a color selection.
 * Idealy a side scrolling or vertical scrolling list of color blocks from which
 * we're recommending alternatives or complementaries to.
 */
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Appearance } from 'react-native';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "aliceblue"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "antiquewhite"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "aqua",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "aquamarine",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "azure"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "beige",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "bisque",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "blanchedalmond",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "blue",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "blueviolet",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "brown",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "burlywood",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function RecommendationView({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
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
