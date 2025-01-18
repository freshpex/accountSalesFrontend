import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      dispatch({ type: 'HANDLE_GOOGLE_CALLBACK', payload: { token } });
    } else if (error) {
      dispatch({ type: 'login_error', payload: error });
    }
  }, [dispatch, location]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      Processing login...
    </div>
  );
};

export default GoogleCallback;
