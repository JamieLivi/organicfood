import {Auth} from 'aws-amplify';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, IconButton, List, Text} from 'react-native-paper';
import AuthContext from '../context/AuthContext';
import {API} from 'aws-amplify';
import {listVeggies} from '../graphql/queries';
import {
  RouteProp,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}

const AdminDashboardScreen = (props: Props) => {
  const [loading, setloading] = useState(false);
  const {setSignedIn} = useContext(AuthContext);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const {data: vegData} = await API.graphql({query: listVeggies});
  //       setData(vegData?.listVeggies?.items || []);
  //     } catch (error) {
  //       console.log('🚀 ~ error', error);
  //     }
  //   };
  //   getData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const {data: vegData} = await API.graphql({query: listVeggies});
          setData(vegData?.listVeggies?.items || []);
        } catch (error) {
          console.log('🚀 ~ error', error);
        }
      };
      getData();

      return () => {};
    }, []),
  );

  const onPressSignOut = async () => {
    setloading(true);
    try {
      const result = await Auth.signOut();

      console.log(result);
      setSignedIn(false);
      //    setAuthStatus('loading')
    } catch (e: any) {
      setloading(false);
      console.log(e);
    }
  };

  const renderItem = ({item}) => {
    return (
      <List.Item title={item.name}>
        <IconButton icon="delete" />
      </List.Item>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <Button compact onPress={() => props.navigation.navigate('AddItem')}>
          Add Item
        </Button>
        <Button compact loading={loading} onPress={onPressSignOut}>
          Sign Out
        </Button>
      </View>
      <View style={{flex: 1}}>
        <FlatList renderItem={renderItem} data={data} />
      </View>
    </View>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
