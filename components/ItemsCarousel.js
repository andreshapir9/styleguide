import { StyleSheet, Text, useWindowDimensions, View, Image } from "react-native";
import React from "react";
import { Carousel } from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "../config/categories";

const ItemsCarousel = () => {
  console.log(categories);
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Carousel
        activeSlideAlignment="center"
        data={categories}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.58}
        inactiveSlideScale={0.75}
      />
    </View>
  );
};

const renderItem = ({ item, index }) => {
  return (
    <View style={[styles.item, { backgroundColor: '#D1D1D1' }]}>
      <View style={styles.itemHeader}>
        <Text style={styles.headerText}>New</Text>
        <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={12} color="black" />
      </View>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );
};

export default ItemsCarousel

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  item: {
    padding: 15,
    borderRadius: 15,
  },
  title: {
    color: 'black',
    fontWeight: '500',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  headerText: {
    fontSize: 12,
    fontWeight: "300"
  },
  itemImage: {
    width: '100%',
    height: 'auto',
    aspectRatio: 2 / 3,
    alignSelf: 'center',
    marginBottom: 10,
  }
})