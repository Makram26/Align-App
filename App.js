import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { LogBox } from 'react-native';
import Providers from './src/navigation';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


const App = () => {
  return (
    <Providers/>
  );
}
export default App





