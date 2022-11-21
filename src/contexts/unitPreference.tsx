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

interface UnitPreferenceProviderProps {
  initialData?: {
    preference: UnitPreference;
  };
}

export default function UnitPreferenceProvider({
  children,
  initialData,
}: PropsWithChildren<UnitPreferenceProviderProps>) {
  const [preference, setPreference] = useState<UnitPreference>(
    initialData?.preference ?? DEFAULT_UNIT_PREFERENCE
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
