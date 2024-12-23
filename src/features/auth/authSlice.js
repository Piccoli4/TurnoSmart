import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  localId: '',
  email: '',
  idToken: '',
  name: '',
  lastName: '',
  image: '',
  dni: '',
  birthDate: '',
  role: 'user' // Valor predeterminado 
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.localId = action.payload.localId 
      state.email = action.payload.email
      state.idToken = action.payload.idToken
      state.name = action.payload.name
      state.lastName = action.payload.lastName
      state.image = action.payload.image
      state.dni = action.payload.dni
      state.birthDate = action.payload.birthDate 
      state.role = action.payload.role; // Actualiza el rol
    },
    clearUser: (state, action) => {
      state.localId = ""
      state.email = ""
      state.idToken = ""
      state.name = ""
      state.lastName = ""
      state.image = ""
      state.dni = ''
      state.birthDate = ''
      state.role = ''
    }
  },
})

// Se generan creadores de acciones para cada reducer function
export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer