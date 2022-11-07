/**
 * PopularPaletteView.js
 * View with the categories of palettes corresponding to data in config folder.
 * Should give palette suggestions based on category, corresponds with the PaletteView page.
 */
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import ItemsCarousel from "./ItemsCarousel";
import appcolors from "../config/appcolors";

export default function PopularPaletteView({ route }) {
  const [selectedId, setSelectedId] = useState(null);
  console.log(route);
  let categories = require('../config/categories.js');
  console.log(categories);
  return (
    <SafeAreaView style={styles.container}>
      <ItemsCarousel categories={categories.categories} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: appcolors.d_background
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
