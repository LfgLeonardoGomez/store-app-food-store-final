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

    const { data } = await api.post('/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return data
  },

  logout: async () => {
    const { data } = await api.post('/logout')
    return data
  },

  me: async () => {
    const { data } = await api.get('/me')
    return data
  },
  register: async (dataRegistro:RegisterType)=>{
    const { data } = await api.post("/register",dataRegistro)
    return data
  }
}
