/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {watchEvents, sendMessage} from 'react-native-watch-connectivity';
import {healthKit} from './healthKit/healthKitInit';
import AppleHealthKit, {HealthValue} from 'react-native-health';

healthKit();

const App = () => {
  const result = {
    heartRate: [] as HealthValue[],
    biologicalSex: {} as string,
  };

  const options = {
    startDate: new Date(2020, 1, 1).toISOString(),
  };

  AppleHealthKit.getHeartRateSamples(
    options,
    (_: string, results: HealthValue[]) => {
      console.log(results);
    },
  );

  AppleHealthKit.getBiologicalSex({}, (_: string, results) => {
    console.log(results);
    setMessage(results.value.toString());
  });

  const [messageFromWatch, setMessageFromWatch] = useState('Waiting...');
  const [message, setMessage] = useState('');
  // Listener when receive message
  const messageListener = () =>
    watchEvents.on('message', message => {
      setMessageFromWatch(message.watchMessage);
    });
  useEffect(() => {
    messageListener();
  }, []);

  const sendMessageHandler = () => {
    sendMessage(
      {messageFromApp: message},
      reply => {
        console.log(reply);
      },
      error => {
        if (error) {
          Alert.alert(
            "The message can't be sent! The watchOS application is probably not running in the foreground! 🤔",
          );
        }
      },
    );
  };

  return (
    <SafeAreaView>
      <Text>Received from Watch App!</Text>
      <Text>{messageFromWatch}</Text>
      <Text>Send to Watch App!</Text>
      <TextInput placeholder="Message" onChangeText={setMessage}>
        {message}
      </TextInput>
      <TouchableOpacity onPress={sendMessageHandler}>
        <Text>SEND!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
