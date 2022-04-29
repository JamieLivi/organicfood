import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Paragraph, Subheading, Title} from 'react-native-paper';
import {Veg} from '../API';
import ItemContext from '../context/ItemContext';

interface Props extends Veg {}

const VeggieListItem = ({name = '', id, subtitle, info}: Props) => {
  const navigation = useNavigation();
  const {setId, setName, setSubtitle, setInfo} = useContext(ItemContext);

  const onPress = () => {
    setName(name);
    setId(id);
    setSubtitle(subtitle || '');
    setInfo(info || '');
    navigation.navigate('VeggieDetails', {id: id});
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
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
        <Paragraph style={styles.paragraph} numberOfLines={3}>
          {info}
        </Paragraph>
        <Button compact style={styles.button} uppercase={false}>
          Read more...
        </Button>

        {/* <Text>{subtitle}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default VeggieListItem;

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    marginVertical: 4,
  },
  image: {
    width: 350,
    height: 200,
  },
  paragraph: {
    margin: 2,
    marginRight: 10,
  },
  button: {
    alignSelf: 'flex-start',
  },
});
