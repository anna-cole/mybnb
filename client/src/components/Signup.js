import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../context/UserContext';

const Signup = () => {
  const { login, setError } = useContext(UserContext);

  useEffect(() => {
    return () => {
      setError(null);
    }
  }, [setError])

  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").matches(/^[a-zA-Z ]*$/, 'Must enter only letters').min(4).max(15),
    email: yup.string().required("Must enter email").email("Invalid email"),
    password: yup.string().required("Must enter a password").min(4).max(15)
  })

  const formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // console.log('API base URL:', process.env.REACT_APP_API_BASE_URL);
      fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values, null, 2)
      })
      .then(resp => {
        if(resp.status === 201) { 
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
          <h2>Create your account</h2>
          <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              className="field"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <p style={{ color: "red" }}> {formik.errors.name}</p>
            <label htmlFor="email">Email Address</label>
            <br />
            <input
              type="email"
              className="field"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
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
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
            <div className='password'>
              <p>Your password must:</p>
              <ul>
                <li>be 4 to 15 characters long</li>
                <li>not be commonly used or easily guessed</li>
              </ul>
            </div>
            <button type="submit" className="submit-button">Create account</button>
          </form>
          <p> Already have an account? &nbsp;
            <button className='default-button' onClick={() => navigate("/login")}>
              Log In
            </button>
          </p>
        </div>
        <div className='image-wrapper'>
          <img className="background-image" src="/camboinhas2.png" alt="camboinhas2" width="500" height="300"/>
        </div>
      </div>
    </div>
  )
}

export default Signup