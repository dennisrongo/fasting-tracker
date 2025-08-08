import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type FastingMethod = {
  id: string;
  name: string;
  fastingHours: number;
  eatingHours: number;
};

export type ActiveFast = {
  methodId: string;
  startISO: string; // ISO string
  endISO?: string;
};

export type FastSession = {
  methodId: string;
  startISO: string;
  endISO: string;
  durationHours: number;
};

export type AppState = {
  methods: FastingMethod[];
  selectedMethodId: string;
  activeFast?: ActiveFast;
  history: FastSession[];
};

type Action =
  | { type: 'selectMethod'; methodId: string }
  | { type: 'startFast'; methodId?: string; startISO?: string }
  | { type: 'endFast'; endISO?: string };

const defaultMethods: FastingMethod[] = [
  { id: '16-8', name: '16:8', fastingHours: 16, eatingHours: 8 },
  { id: '18-6', name: '18:6', fastingHours: 18, eatingHours: 6 },
  { id: '20-4', name: '20:4', fastingHours: 20, eatingHours: 4 },
  { id: '24-0', name: 'OMAD (24:0)', fastingHours: 24, eatingHours: 0 },
  { id: '14-10', name: '14:10', fastingHours: 14, eatingHours: 10 },
];

const initialState: AppState = {
  methods: defaultMethods,
  selectedMethodId: '16-8',
  activeFast: undefined,
  history: [],
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'selectMethod': {
      return { ...state, selectedMethodId: action.methodId };
    }
    case 'startFast': {
      if (state.activeFast) return state; // already active
      const methodId = action.methodId ?? state.selectedMethodId;
      const startISO = action.startISO ?? new Date().toISOString();
      return { ...state, activeFast: { methodId, startISO } };
    }
    case 'endFast': {
      if (!state.activeFast) return state;
      const endISO = action.endISO ?? new Date().toISOString();
      const { methodId, startISO } = state.activeFast;
      const durationHours =
        (new Date(endISO).getTime() - new Date(startISO).getTime()) / (1000 * 60 * 60);
      const session: FastSession = { methodId, startISO, endISO, durationHours };
      return { ...state, activeFast: undefined, history: [session, ...state.history] };
    }
    default:
      return state;
  }
}

const AppStateContext = createContext<{
  state: AppState;
  selectMethod: (id: string) => void;
  startFast: (methodId?: string) => void;
  endFast: () => void;
} | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      selectMethod: (id: string) => dispatch({ type: 'selectMethod', methodId: id }),
      startFast: (methodId?: string) => dispatch({ type: 'startFast', methodId }),
      endFast: () => dispatch({ type: 'endFast' }),
    }),
    [state]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
