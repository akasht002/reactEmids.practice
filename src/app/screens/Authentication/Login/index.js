import React, { useState } from 'react';
import { Input, Button, LoginCover } from '../../../components'
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { login } from '../../../redux/auth/login/actions';
import { checkEmail, checkEmpty } from '../../../utils/validations';
import { Path } from '../../../routes';
import { push } from '../../../redux/navigation/actions';

const Login = ({ login, forgotPassword, errorMessage }) => {

  const [formData, setFormData] = useState({
    UserName: 'Robert@mailinator.com',
    Password: 'Emids@123'
  });

  const [validation, setValidationResult] = useState({
    onClickSubmit: false,
    Password: false,
    UserName: false
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    setValidationResult({
      onClickSubmit: false
    })
  }

  const onSubmit = () => {
    let isValidEmail = checkEmail(formData.UserName)
    let isVaildPassword = !checkEmpty(formData.Password)
    setValidationResult({ UserName: isValidEmail, Password: isVaildPassword, onClickSubmit: true });
    isValidEmail && isVaildPassword && login(formData)
  }

  return (
    <LoginCover test-forget-body='test-forget-body'>
      <h3>Welcome to CoreoHome</h3>
      <div className="form-group  text-center login-body p-0 m-0">
        <Input
          name="UserName"
          value={formData.UserName}
          autoComplete="off"
          required="required"
          type="email"
          placeholder="Enter User ID"
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
          placeholder="Enter Password"
          maxlength={100}
          className={'emailField ' + (validation.onClickSubmit && !validation.Password && 'inputFailure')}
          textChange={(e) => onChange(e)}
        />
        <p className='text-danger d-block OnboardingAlert'>
          {validation.onClickSubmit && !validation.Password && 'Please enter password'}
        </p>
      </div>
      <p className='text-danger d-block OnboardingAlert'>
        {errorMessage !== 'Success' && errorMessage}
      </p>
      <Button
        type="button"
        classname="btn btn-primary send-btn"
        label="Login"
        onClick={onSubmit}
        disable={false}
      />
      <p><span className="login" onClick={forgotPassword}>Forget Password</span></p>

    </LoginCover>
  );
};

Login.propTypes = {
}

export function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(login(data)),
    forgotPassword: () => dispatch(push(Path.forgetPassword))
  }
};

export function mapStateToProps(state) {
  return {
    errorMessage: state.authState.loginState.error.message
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));