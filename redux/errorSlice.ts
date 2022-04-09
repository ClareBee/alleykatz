import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: null,
};


export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    ...initialState
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: state => {
      state.error = null
    },
  }
})

export const { setError, clearError,  } = errorSlice.actions

export default errorSlice.reducer
