import api from '../../../shared/axios'

type RegisterType = {
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  password: string;
};

export const authService = {
  login: async (username: string, password: string) => {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    const { data } = await api.post('/api/v1/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return data
  },

  logout: async () => {
    const { data } = await api.post('/api/v1/logout')
    return data
  },

  me: async () => {
    const { data } = await api.get('/api/v1/me')
    return data
  },
  register: async (dataRegistro:RegisterType)=>{
    const { data } = await api.post("/api/v1/register",dataRegistro)
    return data
  }
}
