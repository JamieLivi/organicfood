import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, List, Text} from 'react-native-paper';
import isWeb from '../utils/isWeb';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const tempData = [
  {id: 1, name: 'carrot', info: 'root vegetable'},
  {id: 2, name: 'parsnip', info: 'minging root vegetable'},
];

const VeggieListScreen = ({navigation, route}: Props) => {
  const renderItem = ({item}) => {
    const onPress = () => {
      console.log(item.name);
      navigation.navigate('VeggieDetails', {id: item.id});
    };
    return <List.Item onPress={onPress} title={item.name} />;
  };
  return (
    <>
      <View style={styles.container}>
        <FlatList data={tempData} renderItem={renderItem} />
      </View>
      <View>
        {isWeb && (
          <Button onPress={() => navigation.navigate('Admin')}>Admin</Button>
        )}
      </View>
    </>
  );
};

export default VeggieListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
