import { getTemperatureData } from '../../src/models/Temperature';

describe('Temperature model', () => {
  it.each([
    { inputCelsius: 2, celsius: 2, fahrenheit: 36 },
    { inputCelsius: 15, celsius: 15, fahrenheit: 59 },
    { inputCelsius: 18, celsius: 18, fahrenheit: 64 },
    { inputCelsius: 20, celsius: 20, fahrenheit: 68 },
  ])(
    'should convert Celsius to Fahrenheit: { inputCelsius: $inputCelsius, expectedCelsius: $celsius, expectedFahrenheit: $fahrenheit }',
    ({ inputCelsius, ...expected }) => {
      const actual = getTemperatureData({ fromCelsius: inputCelsius });

      expect(actual.valueCelsius).toBe(expected.celsius);
      expect(actual.valueFahrenheit).toBe(expected.fahrenheit);
    },
  );
});
