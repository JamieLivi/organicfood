import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Paragraph, Subheading, Title} from 'react-native-paper';

import {RouteProp, NavigationProp} from '@react-navigation/native';
import ItemContext from '../context/ItemContext';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}
const VeggieDetailsScreen = ({navigation, route}: Props) => {
  const {id: vegId, name, subtitle, info} = useContext(ItemContext);
  const id = route.params?.id || vegId;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: name || '',
    });
  }, [navigation, name]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Title>{name}</Title>
        <Subheading>{subtitle}</Subheading>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `https://veggiestoragebucket151427-dev.s3.eu-west-1.amazonaws.com/public/${id}.jpeg`,
            }}
          />
        </View>
        <Paragraph style={styles.paragraph}>{info}</Paragraph>
      </ScrollView>
    </View>
  );
};

export default VeggieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    marginTop: 10,
  },
  image: {
    width: 350,
    height: 200,
  },
  paragraph: {
    margin: 2,
    marginRight: 10,
    marginTop: 20,
  },
});
