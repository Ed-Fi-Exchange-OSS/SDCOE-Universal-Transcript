import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { IconContext } from 'vyaguta-icons';

import { getAuthConfig } from 'services/config';
import AuthProvider from 'context/AuthContext';

import { Toast, Loading } from 'components/common';
import { Footer } from 'components/common/layout';
import AppRouter from 'Router';

const IconDefaultParams = {
  size: '24px',
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocalAuthEnabled, setLocalAuthEnabled] = useState(false);
  const [isMicrosoftAuthEnabled, setMicrosoftAuthEnabled] = useState(false);

  useEffect(() => {
    const setAuthConfig = async () => {
      const res = await getAuthConfig();
      setLocalAuthEnabled(res.isLocalAuthEnabled);
      setMicrosoftAuthEnabled(res.isMicrosoftAuthEnabled);
      setIsLoading(false);
    };
    setAuthConfig();
    return () => setAuthConfig();
  }, []);

  return (
    <AuthProvider>
      <IconContext.Provider value={IconDefaultParams}>
        {isLoading ? (
          <div className="loader-full-height d-flex align-items-center justify-content-center">
            <Loading />
          </div>
        ) : (
          <Router>
            <AppRouter isLocalAuthEnabled={isLocalAuthEnabled} isMicrosoftAuthEnabled={isMicrosoftAuthEnabled} />
            <Footer />
          </Router>
        )}
        <Toast />
      </IconContext.Provider>
    </AuthProvider>
  );
}

export default App;
