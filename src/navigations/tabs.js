import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LeaderBoard from "../screens/LeaderBoard";
import Forum from "../screens/Forum";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen}/>
            <Tab.Screen name='Forum' component={Forum}/>
            <Tab.Screen name='Leaderboard' component={LeaderBoard}/>
            <Tab.Screen name='Settings' component={SettingsScreen}/>
        </Tab.Navigator>
    )
}

export default Tabs;