const accountRoute = 'account'
const adminRoute = 'panel'

const API_routes = {
  account: {
    login: `${accountRoute}/login`,
    logout: `${accountRoute}/logout`,
    delete: `${accountRoute}`,
    edit: `${accountRoute}`,
    register: `${accountRoute}/register`,
    confirmRegistration: `${accountRoute}/confirmregistration`,
    resendRegisterConfirmation: `${accountRoute}/resendregisterconfirmation`,
    checkJWT: `${accountRoute}/checktoken`,
    forget: `${accountRoute}/forgetpassword`,
    forgetResetpassword: `${accountRoute}/forgetresetpassword`,
    resetpassword: `${accountRoute}/resetpassword`,
  },

  admin: {
    user: `${adminRoute}/user`,
    accountTie: `${adminRoute}/accounttie`,
  },

  models: {
    request: `/panel/request`,
    client: `/panel/client`,
    product: `/panel/product`,
  },
}

export { API_routes }
