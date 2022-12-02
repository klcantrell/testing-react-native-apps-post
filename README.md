# Testing React Native Apps example app

## Prerequisites

1. Set up your environment for React Native development: https://reactnative.dev/docs/environment-setup
1. Clone the repo
1. Install dependencies
    * TypeScript/JavaScript: `npm install`
    * iOS: `cd ios && pod install && cd ..`
    * Android: nothing special needed

## Run unit and component tests

`npm test`

## Run UI tests

### iOS

1. Build: `npm run uitest-build:ios-release`
1. Open an iPhone 12 Simulator
1. Run: `npm run uitest-run:ios-release`

### Android

1. Prerequisite: ensure you have a Pixel 3 emulator created and named "Pixel_3a_API_30_x86". See https://wix.github.io/Detox/docs/guide/android-dev-env#android-aosp-emulators for guidance.
1. Launch Android emulator: `npm run launch-android-emulator`
1. Build: `npm run uitest-build:android-release`
1. Run: `npm run uitest-run:android-release`
