import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {API} from '@aws-amplify/api';
import {ActivityIndicator, Button, List, Text} from 'react-native-paper';
import isWeb from '../utils/isWeb';
import VeggieListItem from '../components/VeggieListItem';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const VeggieListScreen = ({navigation, route}: Props) => {
  const [data, setData] = useState<any>([]);
  const [loading, setloading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setloading(true);
        try {
          const response = await API.get('veggierestapi', '/items/*', {});
          console.log('🚀 ~ response', response);
          setData([...response]);
        } catch (err) {
          console.log(err);
        }
        setloading(false);
      };
      fetchData();

      return () => {};
    }, []),
  );

  const renderItem = ({item}) => {
    return <VeggieListItem {...item} />;
  };
  return (
    <>
      <View style={styles.container}>
        <FlatList
          keyExtractor={i => i.id.toString()}
          data={data}
          ListEmptyComponent={
            <ActivityIndicator style={{paddingVertical: 20}} />
          }
          renderItem={renderItem}
        />
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
