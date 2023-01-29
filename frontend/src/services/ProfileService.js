import { api } from './api'

export const useProfileService = () => {

  async function findAll() {
    const response = await api.get('/profiles');
    return response;
  }

  return {
    findAll
  }
  
}