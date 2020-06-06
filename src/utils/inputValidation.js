const PhoneUtils = require('google-libphonenumber').PhoneNumberUtil.getInstance()

module.exports = class inputValidator {
  static validate (inputType, text) {
    return inputValidator[inputType](text)
  }

  static any () {
    return true
  }

  static text (text) {
    return (/^([^0-9]*)$/).test(text)
  }

  static number (text) {
    return Number.parseInt(text)
  }

  static email (text) {
    const regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regExpEmail.test(text)
  }

  static phone (text) {
    const parsedPhoneNumber = PhoneUtils.parse(text, 'BR')
    return PhoneUtils.isValidNumber(parsedPhoneNumber)
  }
}
