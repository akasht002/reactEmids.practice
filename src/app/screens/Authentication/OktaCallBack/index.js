import React from 'react'
import { ScreenCover } from '../../../components'
import {connect} from 'react-redux'
import {userFound} from 'redux-oidc'
import { onLoginSuccess, onLoginFail } from '../../../redux/auth/login/actions';
import { isSecureLogin } from '../../../redux/auth/user/actions';
class OktaCallBack extends React.PureComponent {
    componentDidMount(){
        this.props.isSecureLogin(true)
        let localStorageData = JSON.parse(localStorage.getItem("okta-token-storage"));
        if(localStorageData){
            const {idToken, accessToken} = localStorageData
            let loginResponse = {
                access_token: accessToken.accessToken,
                expires_at: accessToken.expiresAt,
                id_token: idToken.idToken,
                profile: {
                    amr: idToken.claims.amr,
                    auth_time: idToken.claims.auth_time,
                    idp: idToken.claims.idp,
                    sub: idToken.claims.preferred_username,
                    scope: accessToken.scopes,
                    token_type: accessToken.tokenTyp
                }
            }
            this.props.onUserFound(loginResponse)
            this.props.onLoginSuccess(loginResponse)
        }else {
            this.props.onLoginFail()
        }
    }

    render(){
        return <ScreenCover isLoading={true} />
    }
}

export function mapDispatchToProps(dispatch) {
    return {
      onLoginSuccess: (data) => dispatch(onLoginSuccess(data)),
      onLoginFail: () => dispatch(onLoginFail()),
      onUserFound: (data) => dispatch(userFound(data)),
      isSecureLogin: (data) => dispatch(isSecureLogin(data))
    }
  }
  
export default connect(null, mapDispatchToProps)(OktaCallBack)