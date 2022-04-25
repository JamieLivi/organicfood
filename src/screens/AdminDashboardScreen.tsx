import {Auth, graphqlOperation} from 'aws-amplify';
import React, {useCallback, useContext, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import AuthContext from '../context/AuthContext';
import {API} from 'aws-amplify';
import {listVegs} from '../graphql/queries';
import {
  RouteProp,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {deleteVeg} from '../graphql/mutations';
import ToastContext from '../context/ToastContext';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}

const AdminDashboardScreen = (props: Props) => {
  const {popToast} = useContext(ToastContext);
  const [loading, setloading] = useState(false);
  const {setSignedIn} = useContext(AuthContext);
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const {data: vegData}: any = await API.graphql({query: listVegs});
          console.log('🚀 ~ vegData', vegData);
          setData(vegData?.listVegs?.items || []);
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

  const renderItem = ({item}: any) => {
    const onPressBin = async () => {
      console.log(item.id, item.updatedAt);
      try {
        const result = await API.graphql(
          graphqlOperation(deleteVeg, {
            input: {
              id: item.id,
              updatedAt: item.updatedAt,
            },
          }),
        );
        console.log('🚀 ~ result', result);
        popToast('success!');
      } catch (error) {
        console.log('🚀 ~ error', error);
      }
    };

    // const onPressEdit = () => {};

    const renderImage = () => (
      <Image
        source={{
          uri: `https://veggiestoragebucket151427-dev.s3.eu-west-1.amazonaws.com/public/${item.id}.jpeg`,
        }}
        style={styles.image}
      />
    );

    return (
      <List.Item
        left={renderImage}
        title={item.name}
        descriptionNumberOfLines={20}
        description={`${item.subtitle}\n\n${item.info}`}
        right={(itemProps: any) => (
          <>
            <TouchableOpacity onPress={onPressBin}>
              <List.Icon {...itemProps} icon="delete" />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onPressEdit}>
              <List.Icon {...itemProps} icon="pencil" />
            </TouchableOpacity> */}
          </>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          compact
          style={styles.mr5}
          onPress={() => props.navigation.navigate('AddItem')}>
          Add Item
        </Button>
        <Button
          mode="contained"
          compact
          loading={loading}
          onPress={onPressSignOut}>
          Sign Out
        </Button>
      </View>
      <View style={styles.listcontainer}>
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
  listcontainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingTop: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  mr5: {
    marginRight: 5,
  },
});
