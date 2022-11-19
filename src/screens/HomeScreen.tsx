import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainTabRoutes, type MainTabScreenProps } from './RootNavigator';

export default function HomeScreen(
  _props: MainTabScreenProps<MainTabRoutes.Home>,
) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ marginBottom: 128 }}>Home</Text>
    </View>
  );
}
