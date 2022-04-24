import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {Veg} from '../API';

interface Props extends Veg {}

const VeggieListItem = (props: Props) => {
  const navigation = useNavigation();
  const onPress = () => {
    console.log(props.name);
    navigation.navigate('VeggieDetails', {id: props.id});
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{props.name}</Text>
        <Text>{props.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VeggieListItem;

const styles = StyleSheet.create({
  container: {},
});
