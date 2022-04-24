import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import {RouteProp, NavigationProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}
const VeggieDetailsScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>VeggieDetailsScreen</Text>
    </View>
  );
};

export default VeggieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
