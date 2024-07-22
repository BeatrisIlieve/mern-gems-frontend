


















export const CVV_CODE_PATTERN = /^\d{3}$/;

const CVV_CODE_PATTERN_ERROR_MESSAGE =
  "The CVV code should be exactly 3 digits long";

export const ERROR_MESSAGES = {
  password: PASSWORD_ERROR_MESSAGE,
  newPassword: PASSWORD_ERROR_MESSAGE,
  retypeNewPassword: PASSWORD_ERROR_MESSAGE,
  retypePassword: PASSWORD_ERROR_MESSAGE,
  passwordMismatch: PASSWORD_MISMATCH_ERROR_MESSAGE,
  email: EMAIL_ERROR_MESSAGE,
  retypeEmail: EMAIL_ERROR_MESSAGE,
  emailMismatch: EMAIL_MISMATCH_ERROR_MESSAGE,
  firstName: NAME_ERROR_MESSAGE,
  lastName: NAME_ERROR_MESSAGE,
  birthday: DATE_ERROR_MESSAGE,
  specialDay: DATE_ERROR_MESSAGE,
  phoneNumber: PHONE_ERROR_MESSAGE,
  street: STREET_ERROR_MESSAGE,
  zipCode: ZIP_CODE_ERROR_MESSAGE,
  city: NAME_ERROR_MESSAGE,
  apartment: APARTMENT_ERROR_MESSAGE,
  country: NAME_ERROR_MESSAGE,
  longCardNumber: LONG_CARD_NUMBER_PATTERN_ERROR_MESSAGE,
  cvvCode: CVV_CODE_PATTERN_ERROR_MESSAGE,
  cardHolder: CARD_HOLDER_NAME_PATTERN_ERROR_MESSAGE,
};
