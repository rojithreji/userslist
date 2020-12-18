import React,{useEffect,useState} from 'react'

const Input = (props) => {
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

            props.parentCallBack(e.target.value);
            setState({inputValue: e.target.value});

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



    return (
        <div>
            {
                    <input type={state.type}
                        className={state.disabled ? `input disabledClass ${state.className}` : `input ${state.className}`}
                        value={state.inputValue}
                        placeholder={state.placeHolder}
                        name={state.name}
                        onChange={(e) => onChangeInput(e)}
                        // onKeyDown={e => onKeyDownInput(e)}
                        // ref={inputRef}
                        maxLength={state.maxlength}
                        minLength={state.minlength}
                        disabled={state.disabled}
                        // onKeyPress={e => onKeyPressInput(e)}
                    />
            }        
            
        </div>
    )
}

export default Input

