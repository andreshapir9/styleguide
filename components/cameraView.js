/**
 * cameraView.js
 * 
 * Camera tab,
 * After taking a picture and allowing user to select color, should 
 * transition to the recommendationView with that view getting 
 * the color selected as an argument.
 */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
//import PixelColor from 'react-native-pixel-color';
import { GetColorName } from 'hex-color-to-color-name';
import GetPixelColor from 'react-native-get-pixel-color';
import { toHsv } from 'react-native-color-picker'

export default function CameraView({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imageUriHeight, setImageUriHeight] = useState(null);
  const [imageUriWidth, setImageUriWidth] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selected_pixel, setSelectedPixel] = useState(null);

  const permissionFunc = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permissionFunc();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
      setImageUriHeight(data.height);
      setImageUriWidth(data.width);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
      setImageUriHeight(result.height);
      setImageUriWidth(result.width);
    }
  };

  const getBackgroundColor = () => {
    if (selected_pixel) {
      return selected_pixel;
    }
    return '#ffffff';
  }


  const getCoordinates = (evt) => {
    console.log("x: " + evt.nativeEvent.locationX);
    console.log("y: " + evt.nativeEvent.locationY);
    let hex = ""
    // navigation.navigate('Recommendations', {
    //   SelectedColor: toHsv(hex)
    // })
    //lets print the size of the image vs the size of the image on the screen
    //the image oin the screen is 400*250
    console.log("imageUriHeight: " + imageUriHeight);
    console.log("imageUriWidth: " + imageUriWidth);
    //lets get the ratio of the image on the screen vs the actual image
    let HeightRatio = imageUriHeight / 250;
    let WidthRatio = imageUriWidth / 400;
    console.log("HeightRatio: " + HeightRatio);
    console.log("WidthRatio: " + WidthRatio);
    //lets get the actual x and y coordinates of the image
    let x = evt.nativeEvent.locationX * WidthRatio;
    let y = evt.nativeEvent.locationY * HeightRatio;
    
    //lets crete a dictionary of all the colors
    let r=0, g=0, b=0;
    //lets set the image we want to get the color from
    GetPixelColor.setImage(imageUri).then(() => {
      console.log("image set");
    }).catch((err) => {
      console.log(err);
    });
    //we will traverse the image and get 2*2 pixels
    for (let i = x - 1; i < x + 1; i++) {
      for (let j = y - 1; j < y + 1; j++) {
        //get the color of the pixel
        GetPixelColor.pickColorAt(x, y).then((color) => {
          r += parseInt(color.substring(1,3), 16);
          g += parseInt(color.substring(3,5), 16);
          b += parseInt(color.substring(5,7), 16);

          //lets make sure we are at x and y
          if (i == x && j == y) {
            //lets get the average as integers
            r = Math.round(r / 4);
            g = Math.round(g / 4);
            b = Math.round(b / 4);
            console.log("r: " + r + " g: " + g + " b: " + b);
            //lets convert to hex
            hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            console.log("hex: " + hex);
            setSelectedPixel(hex);
            console.log("selected_pixel: " + selected_pixel);
            // navigation.navigate('Recommendations', {
            //   SelectedColor: toHsv(hex)
            // })
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }




  }




  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>

      <Button title={'Take Picture'} onPress={takePicture} />
      <Button title={'Gallery'} onPress={pickImage} />

      {imageUri &&
        <TouchableWithoutFeedback onPress={getCoordinates}>
          <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      }
      <SafeAreaView style={styles.colorRecognition} backgroundColor={getBackgroundColor()}>
        <TouchableWithoutFeedback onPress={ () => navigation.navigate('Recommendations', {
          SelectedColor: toHsv(getBackgroundColor()) })}>

          <Text style={styles.colorText}>{GetColorName(getBackgroundColor())}</Text>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  colorRecognition: {
    backgroundColor: 'white',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 40,
  },
  colorText: {
    alignSelf: 'center',
    fontSize: 40,
  },
});