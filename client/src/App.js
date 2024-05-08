import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Properties from './components/Properties';
import Navbar from './components/Navbar';
import Error from './components/Error';
// import Pro from './components/Pro';
// import ProForm from './components/ProForm';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  // const [pros, setPros] = useState([]);

  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if (r.ok) {
        r.json().then(guest => login(guest))
      }
    })
  }, [])

  // useEffect(() => {
  //   fetch("/pros")
  //     .then(resp => resp.json())
  //     .then(pros => setPros(pros))
  // }, [])

  const login = guest => {
    setCurrentUser(guest)
    setLoggedIn(true)
  }

  const logout = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }

  // const addPro = newPro => {
  //   setPros([...pros, newPro])
  // }

  // const updatePro = updatedProObj => {
  //   const updatedPros = pros.map(pro => {
  //     if (pro.id === updatedProObj.id) {
  //       return updatedProObj
  //     } else {
  //       return pro
  //     }
  //   })
  //   setPros(updatedPros)
  // }

  // const deletePro = id => {
  //   const updatedPros = pros.filter(pro => pro.id !== id)
  //   setPros(updatedPros)
  // }

  return (
    <Router>
      <Navbar logout={logout} loggedIn={loggedIn} />
      <Error />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup login={login} />} />
        <Route path="/properties" element={<Properties />} />
        {/* <Route path="/properties" element={<Properties properties={properties} currentUser={currentUser} deleteProperty={deleteProperty} updateProperty={updateProperty} />} /> */}
        {/* <Route path="/pros/:id" element={<Pro />} />
        <Route path="/newpro" element={<ProForm addPro={addPro} setErrors={setErrors} />} /> */}
      </Routes>
    </Router>
  )
}

export default App