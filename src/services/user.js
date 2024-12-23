import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_FIREBASE } from '../firebase/database';
  
// Define un servicio utilizando el baseQuery personalizado para Firebase
export const userApi = createApi({
reducerPath: 'userApi',
baseQuery: fetchBaseQuery({baseUrl: URL_FIREBASE}),
tagTypes: ['postInfo', 'userInfo'],
  endpoints: (builder) => ({
    patchImageProfile: builder.mutation({
      async queryFn({ image, localId, name, lastName, email, dni, birthDate, role }) {
        try {
          const response = await fetch(`${URL_FIREBASE}/users/${localId}.json`, {
            method: 'PATCH', // Utiliza PATCH para agregar o crear el recurso
            body: JSON.stringify({ image, name, lastName, email, dni, birthDate, role: role || 'user' }),
          });
          const data = await response.json();
          return { data: { message: 'Perfil actualizado correctamente', ...data } };
        } catch (error) {
          console.error('Error actualizando el perfil:', error);
          return { error: { message: error.message } };
        }
      },
    }),
    getUser: builder.query({
      query: (localId) => `users/${localId}.json`, // Accede al usuario directamente por su ID
      transformResponse: (response) => {

        if (!response) {
          // Si el usuario no existe, retorna un objeto vacío o lanza un error controlado
          return { locations: [], role: 'user' };
        }
        
        const locations = response.locations ? Object.entries(response.locations).map(item => ({ id: item[0], ...item[1] })) : [];
        return {
          ...response,
          locations,
          role: response.role || 'user' // Incluye el rol con un valor predeterminado
        }
      },
      providesTags: ['userInfo']
    }),
  }),
});

// Exporta hooks para usarlos en componentes funcionales, generados automáticamente basados en los endpoints definidos
export const {
  usePatchImageProfileMutation,
  useGetUserQuery
} = userApi;