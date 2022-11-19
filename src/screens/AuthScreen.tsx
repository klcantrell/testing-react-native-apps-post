import React from 'react';
import { Button, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackRoutes, type RootStackScreenProps } from './RootNavigator';

export default function AuthScreen({
  navigation,
}: RootStackScreenProps<RootStackRoutes.SignIn>) {
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
      <View style={{ marginBottom: 128 }}>
        <Button
          onPress={() => navigation.replace(RootStackRoutes.Main)}
          title="Log In"
        />
      </View>
    </View>
  );
}
