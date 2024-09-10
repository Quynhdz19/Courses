import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RouteMap } from 'src/routes/routeMap'
import { onSignIn } from '../../../redux/action'

const LoginPage = () => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
  })
  const [errMsg, setErrMsg] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setAccount({
      ...account,
      [name]: value,
    })
  }

  const validateSigninData = () => {
    const errors = {}
    if (!account.username.trim()) {
      errors.username = 'Username cannot be empty'
    } else if (account.username.includes(' ')) {
      errors.username = 'Username cannot contain spaces'
    }

    if (!account.password.trim()) {
      errors.password = 'Password cannot be empty.'
    } else if (/\s/.test(account.password)) {
      errors.password = 'Password cannot contain whitespace.'
    } else if (account.password.length <= 5) {
      errors.password = 'Password must be longer than 5 characters.'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateSigninData()
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors)
      return
    }

    try {
      const resultAction = await dispatch(onSignIn(account))
      if (onSignIn.fulfilled.match(resultAction)) {
        navigate(RouteMap.DashboardPage)
      } else {
        setErrMsg({ general: 'An error occurred. Username or password is incorrect!' })
      }
    } catch (err) {
      setErrMsg({ general: 'An error occurred. Please try again.' })
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={account.username}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    {errMsg.username && <div className="text-danger">{errMsg.username}</div>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={account.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    {errMsg.password && <div className="text-danger">{errMsg.password}</div>}
                    {errMsg.general && <div className="text-danger">{errMsg.general}</div>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          <Link to={RouteMap.ForgotPasswordPage}>Forgot password?</Link>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to={RouteMap.RegisterPage}>
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LoginPage
