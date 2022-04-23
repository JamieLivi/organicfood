/**
 *
 * @format
 */

import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from 'react-native-paper';

const App = () => {
  const [theme, setTheme] = useState(DefaultTheme);
  const paperTheme = useMemo(() => {
    const t = theme.dark ? PaperDarkTheme : PaperLightTheme;

    return {
      ...t,
      colors: {
        ...t.colors,
        ...theme.colors,
        surface: theme.colors.card,
        accent: theme.dark ? 'rgb(255, 55, 95)' : 'rgb(255, 45, 85)',
      },
    };
  }, [theme.colors, theme.dark]);

  const navigationRef = useNavigationContainerRef();

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer
        fallback={<Text>Loading…</Text>}
        documentTitle={{
          formatter: (options, route) =>
            `${options?.title ?? route?.name} - Interesting Veggies`,
        }}
        ref={navigationRef}
        theme={theme}>
        <View style={styles.container}>
          <Text>Veggies</Text>
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
