import appleHealthKit from 'react-native-health';
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';

/* Permission options */
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.BiologicalSex,
      AppleHealthKit.Constants.Permissions.DateOfBirth,
      appleHealthKit.Constants.Permissions.BloodGlucose,
    ],
  },
} as HealthKitPermissions;

export const healthKit = () =>
  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!');
    }
  });
