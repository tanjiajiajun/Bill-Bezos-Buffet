import styled from "styled-components";
import {View} from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
    primary: "#121214",
    secondary: "#121214",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#6D28D9"
}

const { primary, secondary, tertiary, darkLight, brand } = Colors

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-colour: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`;
export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: $(tertiary);
`;
export const StyledFormArea = styled.View`
    width: 90%;
`;