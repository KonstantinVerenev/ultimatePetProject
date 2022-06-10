import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { removeUser, setUser } from '../store/userSlice';
import { disableLoading } from '../store/appSlice';

export const useAuthSubscription = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ email: user.email, id: user.uid }));
      }
      if (user === null) {
        dispatch(removeUser());
      }
      dispatch(disableLoading());
    });

    return authSubscriber;
  }, [dispatch]);
};
