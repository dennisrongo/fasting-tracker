# Fasting Tracker (React Native + Expo)

A comprehensive fasting tracker mobile app focused on clear UI, multiple fasting methodologies, robust progress tracking, and community features (to be added). Built with Expo, React Native, Expo Router, and TypeScript.

- __Platforms__: iOS and Android
- __Dev workflow__: Emulator-first (no web target by default)
- __Stack__: Expo SDK 53, React Native 0.79.5, Expo Router 5, TypeScript

---

## Project Status (Phase 1: UI)

- __Navigation__: Bottom tab bar with six tabs: Home, Methods, Timer, History, Profile, Settings
  - Removed template/unused tabs: `two`, `community`
- __Global State__: Context-based (`state/AppState.tsx`) with reducer and actions
  - Methods catalog (16:8, 18:6, 20:4, OMAD, 14:10)
  - Selected method
  - Active fast session (start time, method)
  - History of completed fasts
- __Implemented Screens__
  - __Home__ (`app/(tabs)/index.tsx`): Start/End fast, live elapsed timer, selected method details
  - __Methods__ (`app/(tabs)/methods.tsx`): Select a fasting method from the presets
  - __History__ (`app/(tabs)/history.tsx`): List of completed fasts with duration and start→end timestamps
- __Placeholders__
  - __Timer__ (`app/(tabs)/timer.tsx`): to show target end time, progress ring, remaining time
  - __Profile__ (`app/(tabs)/profile.tsx`), __Settings__ (`app/(tabs)/settings.tsx`)
- __Icons__: FontAwesome (tab icons configured in `app/(tabs)/_layout.tsx`)

---

## Getting Started

### Prerequisites

- Node.js LTS and npm
- __iOS__: Xcode (Simulator installed). First run may require accepting the license and opening Xcode once.
- __Android__: Android Studio + an AVD (emulator). Ensure `adb devices` lists an emulator as `device`.

### Install

```bash
npm install
```

### Run (Emulators only)

- __iOS Simulator__
  - `npm run dev:ios` (preferred)
  - or `npm run ios`
- __Android Emulator__
  - `npm run dev:android` (preferred)
  - or `npm run android`

Notes
- If Metro is already running interactively, press `i` for iOS or `a` for Android.
- To switch connection mode (LAN/Tunnel), start with `npx expo start` and use the CLI/DevTools.

### Testing

```bash
npm test
```

---

## Project Structure

```
mobile-fasting-app/
  app/
    (tabs)/
      _layout.tsx       # Bottom tab navigator (Home, Methods, Timer, History, Profile, Settings)
      index.tsx         # Home screen
      methods.tsx       # Fasting method selection
      timer.tsx         # Timer (placeholder)
      history.tsx       # Completed fasts
      profile.tsx       # Profile (placeholder)
      settings.tsx      # Settings (placeholder)
    _layout.tsx         # Root layout (wraps providers)
  components/           # Themed components and hooks
  constants/            # Theme colors
  state/
    AppState.tsx        # Global context, reducer, actions, hooks
  package.json          # Scripts & dependencies
  tsconfig.json         # Path alias: @/* -> ./*
  app.json              # Expo config
```

### Notable Files

- `app/(tabs)/_layout.tsx`
  - Defines tabs and icons using FontAwesome: `home`, `list`, `clock-o`, `history`, `user`, `cog`
- `state/AppState.tsx`
  - __State__: `methods`, `selectedMethodId`, `activeFast`, `history`
  - __Actions__: `selectMethod(methodId)`, `startFast()`, `endFast()`
- `tsconfig.json`
  - Path alias `@/*` → `./*` (import like `@/state/AppState`)

---

## Roadmap

- __Phase 1 (UI)__
  - Timer screen: progress ring, remaining time, target end time
  - Home polish: target end time, goal completion percent
  - Shared components: `ProgressRing`, `StatWidget`, `MethodCard`
- __Phase 1.5 (Local persistence)__
  - Persist selected method, active fast, and history via AsyncStorage
- __Phase 2 (Data)__
  - API integration for persistence and sync
- __Phase 3 (Community)__
  - Feed, interactions, challenges, moderation tools
- __Phase 4 (Polish)__
  - Notifications/reminders, widgets, accessibility, analytics

---

## Troubleshooting

- __iOS__
  - Open Xcode once to accept licenses and install required components
  - If build issues persist: `xcode-select --install`
- __Android__
  - Ensure an emulator is running and visible to ADB: `adb devices`
  - Install Expo Go from the Play Store in the emulator if prompted
- __Metro/Cache__
  - Clear cache then re-run: `npx expo start -c`
- __Connectivity__
  - Switch to Tunnel if LAN is unreliable: `npx expo start --tunnel`

---

## Scripts

```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "dev:android": "expo start --android",
  "dev:ios": "expo start --ios",
  "test": "jest --watchAll"
}
```

> Project preference: we intentionally do not use the web target in development.

---

## License

No license has been set yet. Add one if you plan to distribute this code.
