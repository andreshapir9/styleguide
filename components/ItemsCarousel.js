import { StyleSheet, Text, useWindowDimensions, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "../config/categories";
import { useNavigation } from '@react-navigation/native'


// TODO: Figure out how to pas
const ItemsCarousel = (categories) => {
  console.log(categories.categories);
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
      <View style={[styles.item, { backgroundColor: '#D1D1D1' }]}>
        <View style={styles.itemHeader}>
          <Text style={styles.headerText}>New</Text>
          <TouchableOpacity>
            <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={12} color="black" />
          </TouchableOpacity>
        </View>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
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