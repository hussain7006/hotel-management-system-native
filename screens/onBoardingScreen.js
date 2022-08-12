import React from "react";
import { Button, View } from "react-native";

function OnBoardingScreen({ navigation }) {
    return (
        <View>
            <Button title="Home" onPress={() => navigation.navigate("Hotels")}></Button>
        </View>
    )
}
export default OnBoardingScreen;