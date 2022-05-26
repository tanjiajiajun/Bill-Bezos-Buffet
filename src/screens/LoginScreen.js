import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Bull from '../../assets/bull.svg';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea
} from './../components/styles';

const LoginScreen = () => {
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../../assets/icon.png')} />
                <PageTitle>Bulls VS Bears</PageTitle>
                <SubTitle>Account Login</SubTitle>
            </InnerContainer>
        </StyledContainer>
    );
}
export default LoginScreen;