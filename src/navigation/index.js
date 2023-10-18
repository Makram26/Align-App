import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import AuthContext from "../Routes/context"
import Spinner from 'react-native-loading-spinner-overlay';

export default function Providers() {
    const [userID, setUserID] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const id = await AsyncStorage.getItem('uid');
                if (id !== null) {
                    setUserID(id);
                }
            } catch (error) {
                console.log('Error retrieving user ID:', error);
            } finally {
                setLoading(false); // Set loading to false once the user ID is retrieved
            }
        })();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            {
                loading ?
                    <Spinner visible={true} />
                    :
                    <AuthContext.Provider
                        value={{ userID, setUserID }}>
                        {
                            userID ?
                                <DrawerNavigator />
                                :
                                <AuthNavigator />
                        }
                    </AuthContext.Provider>
            }
        </View>

        // <View style={{ flex: 1 }}>
        //     <AuthContext.Provider
        //         value={{ userID, setUserID }}>
        //         {
        //             loading ?
        //                 <Spinner visible={true} />
        //                 :
        //                 userID ?
        //                     <DrawerNavigator />
        //                     :
        //                     <AuthNavigator />

        //         }
        //     </AuthContext.Provider>
        // </View>
    );
}