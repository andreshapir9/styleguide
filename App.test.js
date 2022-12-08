import React from 'react';
import renderer from 'react-test-renderer';
// import RecommendationView from './components/recommendationView'
import MainView from './components/mainView'
import ColorPickerView from './components/ColorPickerView';
import * as ColorHelpers from './utils/colorHelpers';

// import { render, screen, fireEvent } from '@testing-library/react-native';
// import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
describe('MainView', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<MainView />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});
describe('ColorPickerView', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<ColorPickerView />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});
describe('SG_Color', () => {
    it( 'should return the correct color' , () => {
        //lets test sg_color
       // expect(ColorHelpers.sg_color(0)).toBe('#FF0000');
        let sg1 = new ColorHelpers.SGCFromRGB(0, 0, 255);
        //lets test the rgb function
        expect(sg1.RGB()).toBe('rgb(0, 0, 255)');

    });
     it( 'should return the correct complementary color' , () => {
        //lets test sg_color
       // expect(ColorHelpers.sg_color(0)).toBe('#FF0000');
        let sg1 = new ColorHelpers.SGCFromRGB(0, 0, 255);
        //lets test the ComplementaryColor function
        expect(sg1.ComplementaryColor()).toBe('rgb(255, 255, 0)');
     });
    it( 'should return the correct triadic color' , () => {
        //lets test sg_color
        let sg1 = new ColorHelpers.SGCFromRGB(0, 0, 255);
        //we have to create a list size 2 of SGCFromRGB
        var1 = new ColorHelpers.SGCFromRGB(255, 0, 0)
        var2 =  new ColorHelpers.SGCFromRGB(0, 255, 0)
        //lets cerate a string to represent the response
        let response = '[{"b": 0, "g": 0, "h": 0, "r": 255, "s": 100, "v": 100}, {"b": 0, "g": 255, "h": 120, "r": 0, "s": 100, "v": 100}]'; 
        //lets test the TriadColors function
        expect(sg1.TriadColors()).toStrictEqual([var1, var2]);
    });
    it( 'should return the correct SquareColors color' , () => {
        //lets test sg_color
        let sg1 = new ColorHelpers.SGCFromRGB(0, 0, 255);
        //lets test the Create a list of 
    });
    it( 'should return the correct MonoColors' , () => {
        //lets test sg_color
        let sg1 = new ColorHelpers.SGCFromRGB(0, 0, 255);

        //variables to hold response
    
        var1 = new ColorHelpers.SGCFromRGB(178.5, 178.5, 255)
        var2 =  new ColorHelpers.SGCFromRGB(102, 102, 255)
        //can we go down to .1digits of precision?
        
        //cast all to int
        var1.s = Math.round(var1.s);

        //lets test the monoColors function
        console.log(sg1.MonoColors());
        expect(sg1.MonoColors()).toStrictEqual([var1, var2]);

    });
    it ( 'should return the correct square colors' , () => {
        //lets test sg_color
        let sg1 = new ColorHelpers.SGCFromRGB(0, 0, 255);
        
        //create some variables to hold the response
        var1 = new ColorHelpers.SGCFromRGB(255, 0, 127.5)
        var2 =  new ColorHelpers.SGCFromRGB(255, 255, 0)
        var3 = new ColorHelpers.SGCFromRGB(0, 255, 127.5)
        

        //lets test the squareColors function
        expect(sg1.SquareColors()).toStrictEqual([var1, var2, var3]);
    });

    // it( 'should return the correctly convert rgb to hsv' , () => {
    //     //lets test sg_color
    //     let sg1 = new ColorHelpers.SGCFromRGB(0, 0, 255);
    //     //lets test the ComplementaryColor function
    //     console.log(sg1.rgbTohsv(255, 0, 0));
    //     expect(sg1.rgbTohsv(255, 0, 0)).toBe('hsv(0, 100, 100)');
    // });
    // it( 'should return the correctly convert hsv to rgb' , () => {
    //     //lets test sg_color
    //     let sg1 = new ColorHelpers.SGCFromRGB(0, 0, 255);
    //     //lets test the ComplementaryColor function
    //     expect(sg1.hsvTorgb()).toBe('rgb(255, 0, 0)');
    // } );
});
// Path: App.test.js
