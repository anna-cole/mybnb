import { useContext } from 'react';
import { ErrorContext } from '../context/error';

const Error = () => {
  const { error } = useContext(ErrorContext); 
  const displayError = <p style={{color: "red"}}>{error}</p>
  
  return (
    <>{ error ? displayError : null }</>
  )
}

export default Error