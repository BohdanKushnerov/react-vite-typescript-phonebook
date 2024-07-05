import { Middleware } from 'redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleAddContactFulfilled: Middleware = () => next => action => {
  if (action.type === 'auth/login/fulfilled') {
    toast.info(
      <span>
        Hello - <b>{action.payload.user.name}</b>
      </span>
    );
  }
  if (action.type === 'auth/register/fulfilled') {
    toast.info(
      <span>
        Hello, you have successfully registered -
        <b>{action.payload.user.name}</b>
      </span>
    );
  }
  if (action.type === 'auth/logout/fulfilled') {
    toast.info('See you soon =)');
  }
  if (action.type === 'contacts/addContacts/fulfilled') {
    toast.success(
      <span>
        Success add - <b>{action.payload.name}</b>
      </span>
    );
  }
  if (action.type === 'contacts/changeContact/fulfilled') {
    toast.success(
      <span>
        Success change - <b>{action.payload.name}</b>
      </span>
    );
  }
  if (action.type === 'contacts/deleteContacts/fulfilled') {
    toast.success(
      <span>
        Success delete - <b>{action.payload.name}</b>
      </span>
    );
  }
  if (
    action.type === 'auth/register/rejected' ||
    action.type === 'auth/login/rejected' ||
    action.type === 'auth/logout/rejected'
  ) {
    toast.error(<b>{action.payload}</b>);
  }

  return next(action);
};
