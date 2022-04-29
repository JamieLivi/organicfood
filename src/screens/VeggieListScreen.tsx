/* eslint-disable react-hooks/exhaustive-deps */
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button, Divider} from 'react-native-paper';
import isWeb from '../utils/isWeb';
import VeggieListItem from '../components/VeggieListItem';
import ItemContext from '../context/ItemContext';
import {Veg} from '../API';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import axios from 'axios';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const statusBarHeight = getStatusBarHeight();

const VeggieListScreen = ({navigation}: Props) => {
  const {resetState} = useContext(ItemContext);
  const [data, setData] = useState<any>([]);
  const [loading, setloading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      resetState();
      const fetchData = async () => {
        setloading(true);
        try {
          const response = await axios.get(
            'https://gqaqcdboij.execute-api.eu-west-1.amazonaws.com/dev/items/*',
          );
          response?.data?.length && setData([...response.data]);
        } catch (err) {
          console.log(err);
        }
        setloading(false);
      };
      fetchData();

      return () => {};
    }, []),
  );

  const renderListHeader = () => <View style={styles.header} />;

  const renderListFooter = () => <View style={styles.footer} />;

  const renderItem = ({item}: {item: Veg}) => {
    return <VeggieListItem {...item} />;
  };
  return (
    <View style={styles.container}>
      {isWeb && (
        <Button
          mode={'contained'}
          compact
          style={styles.adminButton}
          onPress={() => navigation.navigate('Admin')}>
          Admin
        </Button>
      )}

      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={i => i.id.toString()}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          data={data}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ActivityIndicator animating={loading} style={styles.spinner} />
          }
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default VeggieListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: isWeb ? 20 : 0,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginTop: statusBarHeight * 0.5,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  adminButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  divider: {
    padding: StyleSheet.hairlineWidth,
    margin: 2,
    marginVertical: 8,
  },
  spinner: {
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    height: 8,
  },
  footer: {
    margin: 20,
  },
});
