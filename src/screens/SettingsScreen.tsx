import React, { type PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnitPreference } from '../contexts/unitPreference';

import { paddingFromInsets } from '../utils';
import { MainTabRoutes, type MainTabScreenProps } from './RootNavigator';

export default function SettingsScreen(
  _props: MainTabScreenProps<MainTabRoutes.Settings>
) {
  const { preference, setPreference } = useUnitPreference();

  return (
    <SettingsScreenContainer>
      <View style={{ marginBottom: 128, flexDirection: 'row' }}>
        <Pressable
          testID="settingsButtonCelsius"
          accessibilityState={{ selected: preference === 'celsius' }}
          onPress={() => setPreference('celsius')}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 32,
            backgroundColor: preference === 'celsius' ? '#54AAFF' : 'white',
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            borderColor: 'grey',
            borderWidth: 0.5,
            borderRightWidth: 0,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: preference === 'celsius' ? 'white' : 'black',
            }}>
            °C
          </Text>
        </Pressable>
        <Pressable
          testID="settingsButtonFahrenheit"
          accessibilityState={{ selected: preference === 'fahrenheit' }}
          onPress={() => setPreference('fahrenheit')}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 32,
            backgroundColor: preference === 'fahrenheit' ? '#54AAFF' : 'white',
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            borderColor: 'grey',
            borderWidth: 0.5,
            borderLeftWidth: 0.5,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: preference === 'fahrenheit' ? 'white' : 'black',
            }}>
            °F
          </Text>
        </Pressable>
      </View>
    </SettingsScreenContainer>
  );
}

function SettingsScreenContainer({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        ...paddingFromInsets(insets),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {children}
    </View>
  );
}
