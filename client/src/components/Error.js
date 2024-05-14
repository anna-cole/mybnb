import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Error = () => {
  const { error } = useContext(UserContext); 
  // deconstruct, so you don't have to use dot notation to grab the value
  const displayError = <p style={{color: "red"}}>{error}</p>
  
  return (
    <>{ error ? displayError : null }</>
  )
}

export default Error