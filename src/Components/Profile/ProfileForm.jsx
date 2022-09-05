import React, { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../Store/Context';

export default function ProfileForm() {
  const navigate = useNavigate()
  const newPasswordInput = useRef();

  const authenticationContext = useContext(Context)
  const [errorMessage, setErrorMessage] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    setErrorMessage("")

    const newPassword = newPasswordInput.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAeKhmTsTae6lK1e2efI_xKsxbmwZbRdOQ', //change password firebase URL
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authenticationContext.token,
          password: newPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        // success
        navigate("/"); //need to stay on the same page later, no redirecton
      }).catch((err) => {
        console.log(err);
      });

  }

  const validate = (e) => {
    e.preventDefault()
    setErrorMessage("This input is required")
  }

  return (
    <form className="form" onSubmit={newPasswordInput ? validate : submitHandler}>
      <div>
        <fieldset>
          <label htmlFor='new-password'>New Password</label>
          <input type='password' id='new-password' ref={newPasswordInput} />
          <span className='error'>{errorMessage}</span>
        </fieldset>
      </div>
      <div>
        <button>Change password</button>
      </div>
    </form>
  )
}
