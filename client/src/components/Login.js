import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const { login, setError } = useContext(UserContext);

  useEffect(() => {
    return () => {
      setError(null);
    }
  }, [setError])

  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().required("Must enter email").email("Invalid email"),
    password: yup.string().required("Must enter a password").min(4).max(15)
  })

  const formik = useFormik({
    initialValues: {
      "email": "",
      "password": ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: "POST",
        credentials: 'include', // Support session cookies
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values, null, 2)
      })
      .then(resp => {
        if(resp.status === 200) {
          resp.json().then(guest => {
            login(guest)
            navigate("/properties")
          })
        } else {
          resp.json().then(data => setError(data.error))
        }
      })
    }
  })

  return (
    <div className="app">
      <div className='home-container'>
        <div className='home-info'>
          <h2>Please enter your login details</h2>
          <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              className="field"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              autocomplete="email"
            />
            <p style={{ color: "red" }}> {formik.errors.email}</p>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              className="field"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              autocomplete="current-password"
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
            <button type="submit" className="submit-button">Log in</button>
          </form>
          <p> Don't have an account? &nbsp;
            <button className='default-button' onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </p>
        </div>
        <div className='image-wrapper'>
          <img className="background-image" src="/itaqua.png" alt="itaqua" width="500" height="300"/>
        </div>
      </div>
    </div>
  )
}

export default Login