interface CurrentWeather {
  currentTemperatureCelsius: number;
}

export function getCurrentWeather(): Promise<CurrentWeather> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        currentTemperatureCelsius: 15,
      });
    }, 600);
  });
}
