import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TriangleColorPicker, toHsv } from 'react-native-color-picker'


export default function ColorPickerView({ navigation }) {
  const [SelColor, SetSelColor] = useState(toHsv('green')) // initalize with green

  // onColorChange = (color) => {
  //   SetSelColor(color);
  // }

  return (
    <View style={{ flex: 1, padding: 45, backgroundColor: '#212021' }}>
      <Text style={{ color: 'white' }}>React Native Color Picker - Controlled</Text>
      <TriangleColorPicker
        oldColor='purple'
        color={SelColor}
        onColorChange={(color) => SetSelColor(color)}
        onColorSelected={color => alert(`Color selected: ${color}`)}
        onOldColorSelected={color => alert(`Old color selected: ${color}`)}
        style={{ flex: 1 }}
      />
    </View>
  )
}


