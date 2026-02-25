import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'; 
import axios from '../config/axios'; 
import { redirect } from 'react-router-dom';

export const registerUser = createAsyncThunk('auth/registerUser', async ({ formData, redirect} ,{rejectWithValue}) => {
    try {
        const response = await axios.post('/register', formData); 
        alert("successfully registered"); 
        redirect(); 
        console.log(response.data); 
        return response.data;
    } catch(err) {
        console.log(err); 
        return rejectWithValue(err.response.data.error);
    }
}); 


export const loginUser =createAsyncThunk('auth/loginUser',async({formData,redirect},{rejectWithValue})=>{
    try{
        const response=await axios.post('/login',formData)
        alert('login successful')
        console.log(response.data)
        localStorage.setItem('token',response.data.token)
        redirect();
    } catch (err) {
       const msg=err.response.data.error
       alert(msg)
       return rejectWithValue(msg)

    }
})

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        user: null, 
        isLoggedIn: false, 
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.rejected, (state, action) => {
                // Set backend error in state
                if (action.payload) {
                    state.error = action.payload;
                } else if (action.error && action.error.message) {
                    state.error = action.error.message;
                } else {
                    state.error = 'Registration failed.';
                }
            })
            .addCase(loginUser.rejected,(state,action)=>{
                if(action.payload){
                    state.error=action.payload
                }
            })
    }
});

export default authSlice.reducer;