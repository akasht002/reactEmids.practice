export const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1) + ', ';
};

export const formatPhoneNumber = phoneNumberString => {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      let intlCode = match[1] ? ' ' : ''
      return [intlCode,  match[2], '-', match[3], '-', match[4]].join('')
    }
    return null
  }


  export const removeHyphenInPhoneNumber = phoneNumberString => {
    return phoneNumberString.replace(/-/g, '');
  }
  