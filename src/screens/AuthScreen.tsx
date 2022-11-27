import React, { type PropsWithChildren } from 'react';
import { Button, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { paddingFromInsets } from '../utils';
import { RootStackRoutes, type RootStackScreenProps } from './RootNavigator';

export default function AuthScreen({
  navigation,
}: RootStackScreenProps<RootStackRoutes.SignIn>) {
  return (
    <AuthScreenContainer>
      <View style={{ marginBottom: 128, width: 92, height: 65 }}>
        <Button
          onPress={() => navigation.replace(RootStackRoutes.Main)}
          title="Log In"
        />
      </View>
    </AuthScreenContainer>
  );
}

function AuthScreenContainer({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View
      testID="authScreenContainer"
      style={{
        flex: 1,
        ...paddingFromInsets(insets),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {children}
    </View>
  );
}
