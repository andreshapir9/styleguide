import React from 'react';
import renderer from 'react-test-renderer';
import CameraView from './components/cameraView'
import RecommendationView from './components/recommendationView'
import MainView from './components/mainView'
import ColorPickerView from './components/ColorPickerView';

import { render, screen, fireEvent } from '@testing-library/react-native';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
describe('CameraView', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<CameraView />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});
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
// Path: App.test.js
