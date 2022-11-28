import React, { type PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as api from '../api';
import { useUnitPreference } from '../contexts/unitPreference';
import { getTemperatureData } from '../models/Temperature';
import { paddingFromInsets } from '../utils';
import { MainTabRoutes, type MainTabScreenProps } from './RootNavigator';

type CurrentWeatherState =
  | { type: 'initial' }
  | { type: 'loading' }
  | { type: 'success'; currentTemperatureCelsius: number }
  | { type: 'error' };

export default function HomeScreen(
  _props: MainTabScreenProps<MainTabRoutes.Home>
) {
  const [weatherState, setWeatherState] = useState<CurrentWeatherState>({
    type: 'initial',
  });
  const { preference } = useUnitPreference();

  useEffect(() => {
    if (weatherState.type === 'initial') {
      setWeatherState({ type: 'loading' });
      api
        .getCurrentWeather()
        .then(({ currentTemperatureCelsius }) => {
          setWeatherState({ type: 'success', currentTemperatureCelsius });
        })
        .catch(() => {
          setWeatherState({ type: 'error' });
        });
    }
  }, [weatherState.type]);

  if (weatherState.type === 'loading' || weatherState.type === 'initial') {
    return (
      <HomeScreenContainer>
        <ActivityIndicator
          testID="homeScreenLoadingIndicator"
          style={{ marginBottom: 128 }}
        />
      </HomeScreenContainer>
    );
  }

  if (weatherState.type === 'error') {
    return (
      <HomeScreenContainer>
        <Text
          testID="homeScreenErrorMessage"
          style={{
            marginBottom: 128,
            fontSize: 21,
            paddingHorizontal: 32,
            textAlign: 'center',
            color: 'black',
          }}>
          Uh oh, something went wrong. Please make sure you're connected to the
          internet and try again.
        </Text>
      </HomeScreenContainer>
    );
  }

  const temperatureData = getTemperatureData({
    fromCelsius: weatherState.currentTemperatureCelsius,
  });

  let temperatureMessage;
  if (preference === 'fahrenheit') {
    temperatureMessage = `${temperatureData.valueFahrenheit} °F`;
  } else {
    temperatureMessage = `${temperatureData.valueCelsius} °C`;
  }

  return (
    <HomeScreenContainer>
      <View
        style={{
          marginBottom: 128,
          alignItems: 'center',
        }}>
        <Text
          style={{ fontSize: 21, paddingHorizontal: 32, textAlign: 'center' }}>
          Current temperature
        </Text>
        <Text
          testID="homeScreenTemperatureMessage"
          style={{
            fontSize: 42,
            paddingHorizontal: 32,
            fontWeight: '600',
            color: 'black',
          }}>
          {temperatureMessage}
        </Text>
      </View>
    </HomeScreenContainer>
  );
}

function HomeScreenContainer({ children }: PropsWithChildren) {
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
