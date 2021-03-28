import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ConfirmBtn from '../components/ConfirmBtn';

const SideDrawer = ({about,contactus,FaQ,TrackOrder}) => {

    return (
        <View style={{ padding: 30, marginTop: 40,flex:1 }}>
       
                <TouchableOpacity onPress={FaQ} style={{ width: '100%', height: 50 }}>
                    <Text style={{ fontSize: 20 }}>
                        FAQ
                </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={TrackOrder} style={{ width: '100%', height: 50 }}>
                    <Text style={{ fontSize: 20 }}>
                        Track Orders
                </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={contactus} style={{ width: '100%', height: 50 }}>
                    <Text style={{ fontSize: 20 }}>
                        Contact Us
                </Text>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={about} style={{ width: '100%', height: 50 }}>
                    <Text style={{ fontSize: 20 }}>
                        About
                </Text>
                </TouchableOpacity>
         
           <ConfirmBtn contactus={contactus} bottom={45} textValue="Support"></ConfirmBtn>

        </View>
    )
}
export default SideDrawer;