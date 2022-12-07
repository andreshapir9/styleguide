import React from 'react';
import renderer from 'react-test-renderer';
import RecommendationView from './components/recommendationView'
import MainView from './components/mainView'
import ColorPickerView from './components/ColorPickerView';
import SG_Color from './utils/colorHelpers';

import { render, screen, fireEvent } from '@testing-library/react-native';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
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
    });
});
// Path: App.test.js
