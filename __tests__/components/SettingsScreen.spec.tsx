import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import SettingsScreen from '../../src/screens/SettingsScreen';
import {
  MainTabRoutes,
  MainTabScreenProps,
} from '../../src/screens/RootNavigator';
import UnitPreferenceProvider from '../../src/contexts/unitPreference';

describe('SettingsScreen', () => {
  const navigation =
    {} as MainTabScreenProps<MainTabRoutes.Settings>['navigation'];
  const route = {} as MainTabScreenProps<MainTabRoutes.Settings>['route'];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should change unit preference to Fahrenheit', async () => {
    const { getByTestId } = render(
      <UnitPreferenceProvider initialData={{ preference: 'celsius' }}>
        <SettingsScreen navigation={navigation} route={route} />
      </UnitPreferenceProvider>
    );
    expect(getByTestId('settingsButtonCelsius')).toHaveAccessibilityState({
      selected: true,
    });
    expect(getByTestId('settingsButtonFahrenheit')).toHaveAccessibilityState({
      selected: false,
    });

    fireEvent.press(getByTestId('settingsButtonFahrenheit'));

    await waitFor(() => {
      expect(getByTestId('settingsButtonCelsius')).toHaveAccessibilityState({
        selected: false,
      });
      expect(getByTestId('settingsButtonFahrenheit')).toHaveAccessibilityState({
        selected: true,
      });
    });
  });

  it('should change unit preference to Celsius', async () => {
    const { getByTestId } = render(
      <UnitPreferenceProvider initialData={{ preference: 'fahrenheit' }}>
        <SettingsScreen navigation={navigation} route={route} />
      </UnitPreferenceProvider>
    );
    expect(getByTestId('settingsButtonCelsius')).toHaveAccessibilityState({
      selected: false,
    });
    expect(getByTestId('settingsButtonFahrenheit')).toHaveAccessibilityState({
      selected: true,
    });

    fireEvent.press(getByTestId('settingsButtonCelsius'));

    await waitFor(() => {
      expect(getByTestId('settingsButtonCelsius')).toHaveAccessibilityState({
        selected: true,
      });
      expect(getByTestId('settingsButtonFahrenheit')).toHaveAccessibilityState({
        selected: false,
      });
    });
  });
});
