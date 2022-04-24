import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

const AddItemScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>This functionality is only available through the web app</Text>
    </View>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 600,
    padding: 5,
    //  justifyContent: 'space-around',
  },
});
