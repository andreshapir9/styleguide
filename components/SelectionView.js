import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, PressEvent, PointerEvent } from 'react-native';

function handlePress(evt) {
  // Mobile (PressEvent/TouchEvent)
  if (typeof PressEvent == evt.nativeEvent) {
    console.log(`x coord = ${evt.nativeEvent.locationX}\ny coord = ${evt.nativeEvent.locationY}`);
  } else {
    // Web
    console.log(`x coord = ${evt.nativeEvent.offsetX}\ny coord = ${evt.nativeEvent.offsetY}`)
  }
}

export default function TouchSelect() {
  return (
    <TouchableOpacity onPress={(event) => { handlePress(event) }}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Local files and assets can be imported by dragging and dropping them into the editor
        </Text>
        <Image style={styles.logo} source={require('../assets/hutao.png')} />
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 300,
    width: 308,
  }
});
