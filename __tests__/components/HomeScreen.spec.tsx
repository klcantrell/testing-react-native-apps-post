import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import HomeScreen from '../../src/screens/HomeScreen';
import {
  MainTabRoutes,
  MainTabScreenProps,
} from '../../src/screens/RootNavigator';
import * as api from '../../src/api';
import UnitPreferenceProvider from '../../src/contexts/unitPreference';

jest.mock('../../src/api');

describe('HomeScreen', () => {
  const temperatureApiMock = api.getCurrentWeather as jest.MockedFunction<
    typeof api.getCurrentWeather
  >;
  const navigation = {} as MainTabScreenProps<MainTabRoutes.Home>['navigation'];
  const route = {} as MainTabScreenProps<MainTabRoutes.Home>['route'];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display loading indicator while waiting temperature data', async () => {
    temperatureApiMock.mockResolvedValueOnce({ currentTemperatureCelsius: 15 });

    const { queryByTestId } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    const homeScreen = queryByTestId('homeScreenContainer');
    expect(homeScreen).toContainElement(
      queryByTestId('homeScreenLoadingIndicator')
    );
    expect(homeScreen).not.toContainElement(
      queryByTestId('homeScreenTemperatureMessage')
    );
    await waitFor(() => {
      expect(homeScreen).not.toContainElement(
        queryByTestId('homeScreenLoadingIndicator')
      );
    });
    expect(homeScreen).toContainElement(
      queryByTestId('homeScreenTemperatureMessage')
    );
  });

  it('should display temperature data in Celsius', async () => {
    temperatureApiMock.mockResolvedValueOnce({ currentTemperatureCelsius: 15 });

    const { findByTestId } = render(
      <UnitPreferenceProvider initialData={{ preference: 'celsius' }}>
        <HomeScreen navigation={navigation} route={route} />,
      </UnitPreferenceProvider>
    );

    expect(
      await findByTestId('homeScreenTemperatureMessage')
    ).toHaveTextContent(/15 °C/i);
  });

  it('should display temperature data in Fahrenheit', async () => {
    temperatureApiMock.mockResolvedValue({ currentTemperatureCelsius: 15 });

    const { findByTestId } = render(
      <UnitPreferenceProvider initialData={{ preference: 'fahrenheit' }}>
        <HomeScreen navigation={navigation} route={route} />,
      </UnitPreferenceProvider>
    );

    expect(
      await findByTestId('homeScreenTemperatureMessage')
    ).toHaveTextContent(/59 °F/i);
  });

  it('should display an error message if the temperature data fails to load', async () => {
    temperatureApiMock.mockRejectedValueOnce({ currentTemperatureCelsius: 15 });

    const { findByTestId, queryByTestId } = render(
      <UnitPreferenceProvider initialData={{ preference: 'fahrenheit' }}>
        <HomeScreen navigation={navigation} route={route} />,
      </UnitPreferenceProvider>
    );

    expect(await findByTestId('homeScreenErrorMessage')).toHaveTextContent(
      /uh oh, something went wrong. please make sure you're connected to the internet and try again./i
    );
    const homeScreen = queryByTestId('homeScreenContainer');
    const temperatureMessage = queryByTestId('homeScreenTemperatureMessage');
    expect(homeScreen).not.toContainElement(temperatureMessage);
  });
});
