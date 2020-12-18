import React, { useState, useEffect, forwardRef } from 'react';

const InputText = forwardRef((props, inputRef) => {

    const [state, setState] = useState({

        inputValue: '',
        type: '',
        className: '',
        placeHolder: '',
        isKeyPress: false,
        name: '',
        autoFocus: false,
        minlength: '',
        maxlength: '',
        disabled: false
    })


    const onChangeInput = (e) => {



        if (props.numbersOnly) {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                props.parentCallBack(e.target.value);
                setState({inputValue: e.target.value});
            }
        } else if (props.alphabetsOnly) {
            const re = /^[a-zA-Z]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                props.parentCallBack(e.target.value);
                setState({inputValue: e.target.value});
            }
        } else {
            props.parentCallBack(e.target.value);
            setState({inputValue: e.target.value});
        }

    }

    const onKeyDownInput = (e) => {

        props.keypressCallBack(e.target.name, e.key, e);
    }

    useEffect(() => {

        if (props) {
            setState({
                type: props.type ? props.type : 'text',
                inputValue: props.value ? props.value : '',
                className: props.className ? props.className : '',
                placeHolder: props.placeHolder ? props.placeHolder : '',
                autoFocus: props.autoFocus ? props.autoFocus : false,
                name: props.name ? props.name : '',
                isKeyPress: props.isKeyPress ? props.name : false,
                minlength: props.minlength ? props.minlength : '',
                maxlength: props.maxlength ? props.maxlength : '',
                disabled: props.disabled ? props.disabled : false
            });
        }

    }, [props]);

    const onKeyPressInput = (e) => {

        if (props.allowSpace === false) {
            if (e.which === 32) {
                e.preventDefault();
            }
        } else {
            if (e.which === 32 && state.inputValue == '') {
                e.preventDefault();
            }
        }
    }



    return (
        <div className='inputText-group'>
            {
                state.isKeyPress ?
                    <input type={state.type}
                        className={state.disabled ? `input disabledClass ${state.className}` : `input ${state.className}`}
                        value={state.inputValue}
                        placeholder={state.placeHolder}
                        name={state.name}
                        onChange={(e) => onChangeInput(e)}
                        onKeyDown={e => onKeyDownInput(e)}
                        ref={inputRef}
                        maxLength={state.maxlength}
                        minLength={state.minlength}
                        disabled={state.disabled}
                        onKeyPress={e => onKeyPressInput(e)}
                    />
                    :
                    <input type={state.type}
                        className={state.disabled ? 