import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'; 
import axios from '../config/axios'; 


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
        //will check if login credential is correct or not
        const response=await axios.post('/login',formData)
        alert('login successful')
        console.log(response.data)
        localStorage.setItem('token',response.data.token)

        const userResponse=await axios.get('/account',{headers:{Authorization:localStorage.getItem('token')}})
        redirect();
        console.log(userResponse.data);

        return userResponse.data;
        

    } catch (err) {
       const msg=err.response.data.error
       alert(msg)
       return rejectWithValue(msg)

    }
})

export const fetchUser=createAsyncThunk('auth/fetchUser',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('/account',{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
    }
    catch(err){
        const msg =err.response.data.error
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
    reducers: {
        logout:(state)=>{
            state.user=null;
            state.isLoggedIn=false;
        }
    },
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
            .addCase(loginUser.fulfilled,(state,action)=>{
                    state.user=action.payload
                    state.isLoggedIn=true
                    state.error=null
            })
            .addCase(fetchUser.rejected,(state,action)=>{
                    if(action.payload){
                        state.error=action.payload
                    }       
            })
            .addCase(fetchUser.fulfilled,(state,action)=>{
                    state.user=action.payload
                    state.isLoggedIn=true
                    state.error=null
            })
    }
});

export default authSlice.reducer;
export const {logout}=authSlice.actions;