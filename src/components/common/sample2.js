import React, { useState, useEffect, useContext, useRef } from 'react';
import { withRouter } from 'react-router';

import Request from '../../model/Request';
import useFetch from '../../model/useFetch';
import { ACCOUNT } from '../../model/ServiceUrls';
import { Loader } from '../common/LoaderComponent';

import { SCREENS, LOCAL_STORAGE, menuNavigation, MESSAGES } from '../../common/Constants';
import { setToSessionStorage, getFromSessionStorage } from '../../common/utils';
import { AppSettings } from '../../common/AppSettings';

import { storeLogInStatus, storeMenuDetails, showToastMessage, storeUserPreference, showModalDialog } from '../../state/actions/Actions';
import { Store } from '../../App';

import InputText from '../common/InputTextBoxComponent';
import Button from '../common/ButtonComponent';

import shieldlogo from '../../assets/images/shieldlogo.png';
import loginbg from '../../assets/images/loginbg.png';


function LoginForm(props) {

    const [state, dispatch] = useContext(Store);
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('')

    const [buttonDetails, setButtonDetails] = useState({
        className: 'button buttonSubmit',
        value: 'Login',
        params: 'params',
        disabled: false
    })

    const [logInRequest] = useFetch(ACCOUNT.LOGIN);
    const [getUserPreferenceRequest] = useFetch(ACCOUNT.GET_USER_PREFERENCE);
    const [configRequest] = useFetch(ACCOUNT.CONFIG);

    const isPendingRequest = useRef(false);

    useEffect(() => {
        placeInitConfigRequest();
        userNameRef.current.focus();
        document.body.style.setProperty('--primary-bg-color', '#121110');
    }, []);


    // version handling... 
    // useEffect(() => {
    //     fetch('version.json')
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             if (data && data.version && (data.version != process.env.REACT_APP_APP_VERSION)) {
    //                 dispatch(showModalDialog({
    //                     show: true,
    //                     message: 'Please update your app',
    