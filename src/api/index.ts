interface CurrentWeather {
  currentTemperatureCelsius: number;
}

export function getCurrentWeather(): Promise<CurrentWeather> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        currentTemperatureCelsius: randomNumber({ min: 15, max: 20 }),
      });
    }, 600);
  });
}

function randomNumber(params: { min: number; max: number }) {
  return Math.floor(Math.random() * (params.max - params.min + 1) + params.min);
}
