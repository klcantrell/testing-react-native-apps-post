import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type UnitPreference = 'celsius' | 'fahrenheit';

const DEFAULT_UNIT_PREFERENCE = 'celsius';

interface UnitPreferenceContextValue {
  preference: UnitPreference;
  setPreference: (newPreference: UnitPreference) => void;
}

const UnitPreferenceContext = createContext<UnitPreferenceContextValue>({
  preference: DEFAULT_UNIT_PREFERENCE,
  setPreference: () => {},
});

export default function UnitPreferenceProvider({
  children,
}: PropsWithChildren) {
  const [preference, setPreference] = useState<UnitPreference>(
    DEFAULT_UNIT_PREFERENCE,
  );

  return (
    <UnitPreferenceContext.Provider value={{ preference, setPreference }}>
      {children}
    </UnitPreferenceContext.Provider>
  );
}

export function useUnitPreference() {
  return useContext(UnitPreferenceContext);
}
