import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const AddItemScreen = () => {
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
