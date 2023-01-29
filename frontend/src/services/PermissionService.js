import { api } from "./api"

export const usePermissionService = () => {

  async function findAll() {
    const response = await api.get('/permissions');
    return response;
  }
  
  return {
    findAll
  }

}