import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StackLayout from '../../components/layout/StackLayout';
import ReturnBtn from '../../components/ui/ReturnBtn';

const StackItemDetailsScreen = () => {
  return (
    <StackLayout>
      <ReturnBtn style={{right: 50, bottom: 50}} />
    </StackLayout>
  );
};

export default StackItemDetailsScreen;

const styles = StyleSheet.create({});
