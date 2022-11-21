import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import RootNavigator from './screens/RootNavigator';
import UnitPreferenceProvider from './contexts/unitPreference';

const App = () => {
  return (
    <UnitPreferenceProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: 'white' },
        }}>
        <RootNavigator />
      </NavigationContainer>
    </UnitPreferenceProvider>
  );
};

export default App;
