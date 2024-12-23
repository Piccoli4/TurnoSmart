import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from '../features/auth/authSlice'
import { authApi } from '../services/auth'
import { homegetsApi } from '../services/homegets'
import { userApi } from '../services/user'
import { appointmentsApi } from '../services/appointments'

export const store = configureStore({
  reducer: {
    // Agrega el reducer generado como una porción específica de nivel superior
    auth: authReducer,
    [ appointmentsApi.reducerPath ]: appointmentsApi.reducer,
    [ authApi.reducerPath ]: authApi.reducer,
    [ homegetsApi.reducerPath ]: homegetsApi.reducer,
    [ userApi.reducerPath ]: userApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appointmentsApi.middleware, authApi.middleware, homegetsApi.middleware, userApi.middleware),

})

setupListeners(store.dispatch)