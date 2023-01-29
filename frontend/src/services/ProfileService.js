import { api } from './api'
import { toast } from 'react-toastify'

export const useProfileService = () => {

  let errorList = [];
  let statusError = null;

  async function create(profile) {
    await api.post('/profiles', profile).then(response => {
      toast.success('Success!');
    }).catch(error => {
      statusError = error.response.status;
      errorList = error.response.data.errors;
      if (statusError === 400) {
        errorList.map(e => (
          toast.error(e.msg)
        ))
      }
      if (statusError === 409) {
        toast.error(error.response.data.error);
      }
    });
  }

  async function findAll() {
    const response = await api.get('/profiles');
    return response;
  }

  return {
    create,
    findAll
  }
  
}