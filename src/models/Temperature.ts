interface TemperatureData {
  valueCelsius: number;
  valueFahrenheit: number;
}

interface GetTemperatureDataParams {
  fromCelsius: number;
}

export function getTemperatureData({
  fromCelsius: valueCelsius,
}: GetTemperatureDataParams): TemperatureData {
  return {
    valueCelsius,
    valueFahrenheit: Math.round(valueCelsius * (9 / 5) + 32),
  };
}
