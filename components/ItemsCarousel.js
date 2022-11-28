import { StyleSheet, Text, useWindowDimensions, View, Image, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import appcolors from "../config/appcolors";


// Expects a list of Items formated like categories.js
const ItemsCarousel = (categories) => {
  console.log(categories);
  const [activeDotIndex, setActiveDotIndex] = React.useState(0);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Carousel
        activeSlideAlignment="center"
        data={categories.categories}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.58}
        inactiveSlideScale={0.75}
        onSnapToItem={index => setActiveDotIndex(index)}
      />
      <Pagination activeDotIndex={activeDotIndex} dotsLength={categories.length} />
    </View>
  );
};

const renderItem = ({ item, index }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PaletteView')}>
      <View style={[styles.item, { backgroundColor: appcolors.d_bottomgradient }]}>
        <ImageBackground source={item.image} style={styles.itemImage}>
          <View style={styles.itemHeader}>
            <Text style={styles.headerText}>{item.name}</Text>
            <TouchableOpacity>
              <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.itemFooter}>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ItemsCarousel

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 0,
    position: "relative"
  },
  item: {
    padding: 15,
    borderRadius: 15,
    width: '115%',
    overflow: "hidden",
    position: "relative"
  },
  description: {
    color: appcolors.d_primarytext,
    fontWeight: '800',
    bottom: 0,
    position: "absolute",
    width: '100%',
    textAlign: "center"
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  itemFooter: {
    backgroundColor: appcolors.d_topgradient,
    position: "absolute",
    height: '15%',
    width: '100%',
    bottom: 0,
    // flex: 1,
    opacity: 0.75,
  },
  headerText: {
    position: "relative",
    fontSize: 15,
    fontWeight: "500",
    color: appcolors.d_primarytext
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  }
})