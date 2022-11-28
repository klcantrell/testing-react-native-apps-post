import { expect, by, device, element } from 'detox';

describe('Main app experience', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should display the current temperature in the user's preferred measurement system", async () => {
    // login
    await element(by.id('loginButton')).tap();

    // view current temperature in Celsius
    await expect(element(by.id('homeScreenTemperatureMessage'))).toHaveText(
      '15 °C'
    );

    // navigate to settings screen and change preferred measurement system to Fahrenheit
    await element(by.id('settingsTab')).tap();
    await element(by.id('settingsButtonFahrenheit')).tap();

    // navigate back to home screen and view current temperature in Fahrenheit
    await element(by.id('homeTab')).tap();
    await expect(element(by.id('homeScreenTemperatureMessage'))).toHaveText(
      '59 °F'
    );
  });
});
