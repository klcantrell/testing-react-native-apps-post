import { EdgeInsets } from 'react-native-safe-area-context';

export function paddingFromInsets(insets: EdgeInsets) {
  return {
    paddingTop: insets.top,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  };
}
