import { by, device, element, expect } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the login screen', async () => {
    await expect(element(by.id('authScreenContainer'))).toBeVisible();
  });
});
