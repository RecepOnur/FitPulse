import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitpulse.app',
  appName: 'FitPulse',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
