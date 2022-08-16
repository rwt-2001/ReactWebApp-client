import * as api from '../api';
import { AUTH } from "../constants/constants";
export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        const action = { type: AUTH, payload: data };
        dispatch(action);
        navigate('/');
    }
    catch (error) {
        const message = error.response.data.message;
        window.alert(message);
    }
}
export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        const action = { type: AUTH, payload: data };
        dispatch(action);
        navigate('/');
    }
    catch (error) {
        const message = error.response.data.message;
        window.alert(message);

    }
}

export const googleSignIn = (formData, navigate) => async (dispatch) => {

    try {
        const { data } = await api.googleSignIn(formData);
        const action = { type: AUTH, payload: data };
        dispatch(action);
        navigate('/');
    }
    catch (error) {
        const message = error.response.data.message;
        window.alert(message);

    }

}
