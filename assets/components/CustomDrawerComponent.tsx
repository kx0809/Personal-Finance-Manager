import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomAvatar from "./CustomAvatar";

const drawerItems = [
  { label: "Home", icon: "home", route: 'Home' },
  { label: "Report", icon: "book", route: 'Report' },
  { label: "Categories", icon: "category", route: 'Categories' },
  { label: "Feedback", icon: "feedback", route: 'Feedback' },
  { label: "Calculator", icon: "calculate", route: 'Calculator' },
  { label: "Currency Rates", icon: "analytics", route: 'ExchangeRate' },
];

const CustomDrawerComponent = (props: any) => {
  const { navigation, state } = props;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        
        <View style={{ height: windowHeight * 0.25 }}>
          {/* Avatar and User Info */}
          <View style={styles.topDrawerSection}>
            <CustomAvatar />
          </View>
        </View>

        <View style={{ padding: 10, flex: 1 }}>
          {/* Main Drawer Items */}
          {drawerItems.map((item) => (
            <DrawerItem
              key={item.label}
              label={item.label}
              onPress={() => navigation.navigate(item.route)}
              icon={() => (
                <MaterialIcons name={item.icon} color={"#4e342e"} size={20} />
              )}
              focused={state.routeNames[state.index] === item.route}  
              activeBackgroundColor='#d7ccc8'
              activeTintColor='#4e342e'
            />
          ))}
        </View>

        <View style={{ height: windowHeight * 0.10 }}>
          {/* Bottom Drawer Item - Settings */}
          <View style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={() => (
                <MaterialIcons name='settings' color="#4e342e" size={20} />
              )}
              label="Settings"
              onPress={() => navigation.navigate('Settings')}
              focused={state.routes[state.index].name === 'Settings'}
              activeBackgroundColor='#d7ccc8'
              activeTintColor='#4e342e'
            />
          </View>
        </View>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topDrawerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffb300'
  },
  bottomDrawerSection: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
});

export default CustomDrawerComponent;
