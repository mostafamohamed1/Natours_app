import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    let url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    let res = await axios({
      method: 'PATCH',
      url: `${url}`,
      data,
    });

    if (res.data.status === 'success')
      showAlert('success', `${type.toUpperCase()} updated successfully.!`);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
