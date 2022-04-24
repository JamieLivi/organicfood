import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {API} from '@aws-amplify/api';
import {Button, List, Text} from 'react-native-paper';
import isWeb from '../utils/isWeb';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const VeggieListScreen = ({navigation, route}: Props) => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get(
  //         'veggierestapi',
  //         '/items',
  //         //     {},
  //         params,
  //       );
  //       console.log('🚀 ~ response', response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get('veggierestapi', '/items/*', {});
  //       console.log('🚀 ~ response', response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await API.get('veggierestapi', '/items/*', {});
          console.log('🚀 ~ response', response);
          setData([...response]);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();

      return () => {};
    }, []),
  );

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
        <FlatList data={data} renderItem={renderItem} />
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
