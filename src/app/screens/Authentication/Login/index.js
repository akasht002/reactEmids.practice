import React, { useState, useEffect } from 'react';
import { Input, Button, LoginCover } from '../../../components'
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { login, loginFail } from '../../../redux/auth/login/actions';
import { checkEmail, checkEmpty } from '../../../utils/validations';
import { Path } from '../../../routes';
import { push } from '../../../redux/navigation/actions';
import { API_STATUS_CODE } from '../../../constants/status_code';

const Login = ({ login, forgotPassword, errorMessage, loginFail, isLoading }) => {

  useEffect(() => {
    loginFail(API_STATUS_CODE.success)
  },
    []
  );

  const [formData, setFormData] = useState({
    UserName: '',
    Password: ''
  });

  const [validation, setValidationResult] = useState({
    onClickSubmit: false,
    Password: false,
    UserName: false
  });

  const onChange = (e) => {
    loginFail(API_STATUS_CODE.success)
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    setValidationResult({
      onClickSubmit: false
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let isValidEmail = checkEmail(formData.UserName)
    let isVaildPassword = !checkEmpty(formData.Password)
    setValidationResult({ UserName: isValidEmail, Password: isVaildPassword, onClickSubmit: true });
    isValidEmail && isVaildPassword && login(formData)
  }

  return (
    <LoginCover isLoading={isLoading} test-forget-body='test-forget-body'>
      <h3>Welcome to CoreoHome</h3>
      <form>
        <div className="form-group  text-center login-body p-0 m-0">
          <Input
            name="UserName"
            value={formData.UserName}
            autoComplete="off"
            required="required"
            type="email"
            placeholder="Enter email address"
            maxlength={100}
            className={'emailField ' + (validation.onClickSubmit && !validation.UserName && 'inputFailure')}
            textChange={(e) => onChange(e)}
          />
          <p className='text-danger d-block OnboardingAlert'>
            {validation.onClickSubmit && !validation.UserName && 'Please enter a valid Email Address(e.g. abc@xyz.com)'}
          </p>
        </div>
        <div className="form-group text-center login-body p-0 m-0">
          <Input
            name="Password"
            value={formData.Password}
            autoComplete="off"
            required="required"
            type="password"
            placeholder="Enter password"
            maxlength={100}
            className={'emailField ' + (validation.onClickSubmit && !validation.Password && 'inputFailure')}
            textChange={(e) => onChange(e)}
          />
          <p className='text-danger d-block OnboardingAlert'>
            {validation.onClickSubmit && !validation.Password && 'Please enter password'}
          </p>
        </div>
        <p className='text-danger d-block OnboardingAlert'>
          {errorMessage !== API_STATUS_CODE.success && errorMessage}
        </p>
        <Button
          type="submit"
          classname="btn btn-primary send-btn"
          label="Login"
          onClick={onSubmit}
          disable={false}
        />
        <p><span className="login" onClick={forgotPassword}>Forget Password</span></p>
      </form>
    </LoginCover>
  );
};

Login.propTypes = {
}

export function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(login(data)),
    forgotPassword: () => dispatch(push(Path.forgetPassword)),
    loginFail: (data) => dispatch(loginFail(data))
  }
};

export function mapStateToProps(state) {
  return {
    isLoading: state.loadingState.isLoading,
    errorMessage: state.authState.loginState.error.message
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));