import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomAvatar from "./CustomAvatar";

const drawerItems = [
  { label: "Home", icon: "home", route: 'Home' },
  { label: "Search", icon: "search", route: 'Search' },
  { label: "Categories", icon: "category", route: 'Categories' },
  { label: "Feedback", icon: "feedback", route: 'Feedback' },
];

const CustomDrawerComponent = (props: any) => {
  const { navigation, state } = props;
  const windowHeight = Dimensions.get('window').height;

  return (
    <DrawerContentScrollView style={{ backgroundColor: '#fefbe9' }}>
      <View style={{ flex: 1, justifyContent: "space-between", height: "100%" }}>
        
        <View>
          {/* Avatar and User Info */}
          <View style={{ height: windowHeight * 0.25 }}>
            <View style={styles.topDrawerSection}>
              <CustomAvatar />
            </View>
          </View>

          {/* Main Drawer Items */}
          <View style={{ padding: 10, height: windowHeight * .65 }}>
            {drawerItems.map((item, index) => (
              <DrawerItem
                key={item.label}
                label={item.label}
                onPress={() => navigation.navigate(item.route)}
                icon={() => (
                  <MaterialIcons name={item.icon} color={"#4e342e"} size={20} />
                )}
                focused={state.index === index}
                activeBackgroundColor='#d7ccc8'
                activeTintColor='#4e342e'
              />
            ))}
          </View>
        </View>

        {/* Bottom Drawer Item - Settings */}
        <View style={{height: windowHeight * .10}}>
          <View style={[styles.bottomDrawerSection]}>
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
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  topDrawerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#dedede',
    borderBottomWidth: 3
  },
  bottomDrawerSection: {
    borderTopColor: '#dedede',
    borderTopWidth: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5
    
  },
});
/* add something*/

export default CustomDrawerComponent;
