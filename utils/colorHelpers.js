/**
 * ColorHelpers.js
 *
 * Set of functions to deal with color
 */
// https://color.adobe.com/create/color-wheel
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Appearance } from 'react-native';

//Well for the Triad for example you could convert your color to HSV, then just +/-120 degrees on the hue to get the other two colors.
//For your other scheme you could do the same but just +/- something small like 15 degrees.
//The conversion to/from HSV you can perform pretty easily.

//helper function to instantiate color class with given rgb values
export function SGCFromRGB(r, g, b) {
  return new SG_Color(r, g, b);
}

//helper function to instantiate color class with given hsv values
//gets given hsv and passes it to converting function
export function SGCFromHSV(h, s, v) {
  rgb = HSVTORGB(h, s, v);
  r = rgb[0];
  g = rgb[1];
  b = rgb[2];
  return new SG_Color(r, g, b); //returns by instantiating values into class
}

//function used to mathematically convert hsv values to rgb then returned back
export function HSVTORGB(h, s, v) {
  // v /= 100;
  // s /= 100;
  console.log(h);
  console.log(s);
  console.log(v);
  var c = v * s;
  var h_p = h / 60;
  var x = c * (1 - Math.abs((h_p % 2) - 1));

  var r, g, b;

  if (h_p >= 0 && h_p < 1) {
    r = c;
    g = x;
    b = 0;
  }
  if (h_p >= 1 && h_p < 2) {
    r = x;
    g = c;
    b = 0;
  }
  if (h_p >= 2 && h_p < 3) {
    r = 0;
    g = c;
    b = x;
  }
  if (h_p >= 3 && h_p < 4) {
    r = 0;
    g = x;
    b = c;
  }
  if (h_p >= 4 && h_p < 5) {
    r = x;
    g = 0;
    b = c;
  }
  if (h_p >= 5 && h_p < 6) {
    r = c;
    g = 0;
    b = x;
  }

  var m = v - c;
  r = (r + m) * 255;
  g = (g + m) * 255;
  b = (b + m) * 255;
  console.log(r);
  console.log(g);
  console.log(b);
  return [r, g, b];
}

//root color class that makes member variables for RGB and HSV
export class SG_Color {
  constructor(red, green, blue) {
    this.r = red;
    this.g = green;
    this.b = blue;
    this.rgbTohsv(this.r, this.g, this.b);
  }

  //used to update RGB values after HSV values are altered
  UpdateRGB() {
    this.hsvTorgb(this.h, this.s, this.v);
  }

  //used to update HSV values after RGB values are altered
  UpdateHSV() {
    this.rgbTohsv(this.r, this.g, this.b);
  }

  //returns RGB values of object
  RGB() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  //returns HSV values of object
  HSV() {
    return `hsv(${this.h}, ${this.s}, ${this.v})`;
  }

  //returns the blue value of the object
  blue() {
    return 'blue';
  }

  //color function that returns the complementary color of object
  ComplementaryColor() {
    return `rgb(${255 - this.r}, ${255 - this.g}, ${255 - this.b})`;
  }

  //color function that instantiates two more objects and alters its hue value by 120 degrees in order to return proper colors
  TriadColors() {
    var c1 = SGCFromRGB(this.r, this.g, this.b);
    var c2 = SGCFromRGB(this.r, this.g, this.b);
    c1.h += 120;
    c1.h = c1.h % 360;
    c1.UpdateRGB(); //since hue values are altered, RGB values have to be updated
    c2.h -= 120;
    c2.h = c2.h % 360;
    c2.UpdateRGB();

    return [c1, c2];
  }
  //color function that instantiates three more objects and alters its hue value by 90 degrees in order to return proper colors
  SquareColors() {
    var c1 = SGCFromRGB(this.r, this.g, this.b);
    var c2 = SGCFromRGB(this.r, this.g, this.b);
    var c3 = SGCFromRGB(this.r, this.g, this.b);

    c1.h += 90;
    c1.h = c1.h % 360;
    c1.UpdateRGB(); //since hue values are altered, RGB values have to be updated
    c2.h += 180;
    c2.h = c2.h % 360;
    c2.UpdateRGB();
    c3.h += 270;
    c3.h = c3.h % 360;
    c3.UpdateRGB();

    return [c1, c2, c3];
  }

    //color function that instantiates two more objects and alters its saturation value by 60 degrees in order to return proper colors
  MonoColors() {
    var c1 = SGCFromRGB(this.r, this.g, this.b);
    var c2 = SGCFromRGB(this.r, this.g, this.b);

    c1.s += 30;
    c1.s = c1.s % 100;
    c1.UpdateRGB(); //since hue values are altered, RGB values have to be updated
    c2.s += 60;
    c2.s = c2.s % 100;
    c2.UpdateRGB();

    return [c1, c2];
  }

  //function that mathematically converts RGB values to HSV and instantiated to object
  rgbTohsv(r, g, b) {
    var r_p = r / 255;
    var g_p = g / 255;
    var b_p = b / 255;

    var max = Math.max(r_p, g_p, b_p);
    var min = Math.min(r_p, g_p, b_p);
    var diff = max - min;

    var h = -1;
    var s = -1;
    var v = max * 100; //v: final value

    if (diff == 0) h = 0;
    else if (max == r_p) h = (60 * ((g_p - b_p) / diff) + 360) % 360;
    else if (max == g_p) h = (60 * ((b_p - r_p) / diff) + 120) % 360;
    else if (max == b_p) h = (60 * ((r_p - g_p) / diff) + 240) % 360; //h: final value depends on what if statement

    if (max == 0) s = 0;
    else s = (diff / max) * 100; //s: final value depends if max == 0

    this.h = h;
    this.s = s;
    this.v = v;
    //return[h, s, v];
  }

  //function that mathematically converts HSV values to RGB and instantiated to object
  hsvTorgb(h, s, v) {
    v /= 100;
    s /= 100;

    var c = v * s;
    var h_p = h / 60;
    var x = c * (1 - Math.abs((h_p % 2) - 1));

    var r, g, b;

    if (h_p >= 0 && h_p < 1) {
      r = c;
      g = x;
      b = 0;
    }
    if (h_p >= 1 && h_p < 2) {
      r = x;
      g = c;
      b = 0;
    }
    if (h_p >= 2 && h_p < 3) {
      r = 0;
      g = c;
      b = x;
    }
    if (h_p >= 3 && h_p < 4) {
      r = 0;
      g = x;
      b = c;
    }
    if (h_p >= 4 && h_p < 5) {
      r = x;
      g = 0;
      b = c;
    }
    if (h_p >= 5 && h_p < 6) {
      r = c;
      g = 0;
      b = x;
    }

    var m = v - c;
    r = (r + m) * 255;
    g = (g + m) * 255;
    b = (b + m) * 255;

    this.r = r;
    this.g = g;
    this.b = b;
    //return [r, g, b]
  }
}

//example RGB values and name given to test code and color functions
export const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'aliceblue',
    color: [193, 0, 255],
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <>
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  </>
);

//chunk of code to start program and values to test color functions
const App = () => {
  let selectedId = null;
  function setSelectedId(id) { selectedId = id; }
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
    backgroundColor: '#1A1A1A',
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