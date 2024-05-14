import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const { login, error, setError } = useContext(UserContext);

  useEffect(() => {
    return () => {
      setError(null);
    }
  }, [])

  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").matches(/^[a-zA-Z ]*$/, 'Must enter only letters').min(4).max(15),
    password: yup.string().required("Must enter a password").min(4).max(15)
  })

  const formik = useFormik({
    initialValues: {
      "name": "",
      "password": ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/login", {
        method: "POST",
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
      <header>
        <img className="background-image" src="/itaqua.png" alt="itaqua" width="500" height="300"/>
        <h2>Please enter your login details</h2>
      </header>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          input type="text"
          className="field"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="password">Password</label>
        <br />
        <input
          input type="password"
          className="field"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
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
  )
}

export default Login