import React, { useState } from 'react';

const ErrorContext = React.createContext();

function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  return <ErrorContext.Provider value={{error, setError}}>{children}</ErrorContext.Provider>;
}

export { ErrorContext, ErrorProvider };

// time to apply useContext to all data that is prop drilling layers