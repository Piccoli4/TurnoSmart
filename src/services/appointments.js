import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_FIREBASE } from '../firebase/database';
import moment from 'moment';

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL_FIREBASE }),
  tagTypes: ['appointments', 'tests'],
  endpoints: (builder) => ({
    // Obteniene los turnos para una fecha específica
    getAppointments: builder.query({
      query: (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD'); // Asegura que la fecha sea un string en formato YYYY-MM-DD
        return `/appointments/${formattedDate}.json`;
      },
      providesTags: ['appointments'],
    }),

    // Obtiene todos los turnos de todas las fechas
    getAllAppointments: builder.query({
      query: () => {
        return '/appointments.json'; // Obtiene todos los turnos de todas las fechas
      },
      transformResponse: (response) => {
        const allAppointments = [];
        const currentDateTime = moment(); // Obtiene la fecha y hora actual

        // Itera sobre las fechas
        for (const date in response) {
          const dateAppointments = response[date];

          // Itera sobre los turnos de cada fecha
          for (const time in dateAppointments) {
            const appointment = dateAppointments[time];
            if (appointment.users && Array.isArray(appointment.users)) {
              // Filtra turnos por usuario
              appointment.users.forEach((user) => {
                if (user.localId) {
                  // Solo agrega turnos que tengan un localId asociado
                  const appointmentDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
                  if (appointmentDateTime.isAfter(currentDateTime)) {
                    allAppointments.push({
                      date,
                      time,
                      user,
                    });
                  }
                }
              });
            }
          }
        }

        return allAppointments;
      },
      providesTags: ['appointments'],
    }),

    // Agrega un nuevo turno
    addAppointment: builder.mutation({
      async queryFn({ date, time, userData }) {
    
          // Valida que los datos sean correctos
          if (!date || !time || !userData) {
              console.error('Datos faltantes:', { date, time, userData });
              return { error: { message: 'Faltan datos para realizar la reserva' } };
          }
    
          const formattedDate = moment(date).format('YYYY-MM-DD'); // Convierte la fecha al formato estándar

          try {
              // Verifica los turnos existentes para la fecha y hora
              const response = await fetch(`${URL_FIREBASE}/appointments/${formattedDate}/${time}.json`);
              const data = await response.json();
    
              // Verifica si el horario ya tiene 3 reservas
              if (data && data.users && data.users.length >= 3) {
                  return { error: { message: 'Horario no disponible' } };
              }
    
              // Si el horario está disponible, agrega la nueva reserva
              const newUsersList = data ? [...data.users, userData] : [userData];
    
              // Actualiza el turno con la nueva reserva
              await fetch(`${URL_FIREBASE}/appointments/${formattedDate}/${time}.json`, {
                  method: 'PATCH',
                  body: JSON.stringify({
                      users: newUsersList,
                      status: newUsersList.length >= 3 ? 'noAvailable' : 'available',
                  }),
              });
              return { data: userData };
          } catch (error) {
              console.error('Error en la mutación de reserva:', error);
              return { error: { message: error.message } };
          }
      },
      invalidatesTags: ['appointments'],
    }),

    // Mutación para agregar un nuevo estudio asociado al usuario por DNI
    addTest: builder.mutation({
      async queryFn({ name, lastName, dni, report }) {
        try {
          // Validar los datos del formulario
          if (!name || !lastName || !dni || !report) {
            return { error: { message: 'El nombre, apellido, DNI y el informe médico son obligatorios.' } };
          }

          // Estructura del nuevo estudio
          const newTest = {
            name,
            lastName,
            dni,
            report,
            createdAt: new Date().toISOString(),
          };

          // Genera un identificador único basado en timestamp
          const studyId = new Date().getTime();

          // Subir el estudio bajo el DNI con el ID único
          await fetch(`${URL_FIREBASE}/tests/${dni}/${studyId}.json`, {
            method: 'PUT',
            body: JSON.stringify(newTest),
          });

          return { data: newTest };
        } catch (error) {
          console.error('Error al subir el test:', error);
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['tests'],
    }),

    // Obtiene los estudios de un usuario por su DNI
    getTestsByDni: builder.query({
      query: () => {
        return `/tests.json`; // Ruta para obtener todos los estudios asociados al DNI
      },
      transformResponse: (response) => {
        const tests = [];
        for (const testId in response) {
          tests.push({ id: testId, ...response[testId] });
        }
        return tests;
      },
      providesTags: ['tests'],
    }),
  }),
});

export const { 
  useGetAppointmentsQuery, 
  useGetAllAppointmentsQuery, 
  useAddAppointmentMutation, 
  useAddTestMutation,
  useGetTestsByDniQuery  
} = appointmentsApi;