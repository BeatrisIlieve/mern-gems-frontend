import { useLocation } from "react-router-dom";

import { QuestionMark } from "./QuestionMark/QuestionMark";
import { FieldContainer } from "./FieldContainer/FieldContainer";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage";
import { SuccessMessage } from "./SuccessMessage/SuccessMessage";

import { EMAIL_QUESTION_MARK } from "../../../../constants/email";
import { PASSWORD_REQUIREMENTS } from "../../../../constants/password";

import styles from "./FieldBox.module.css";

export const FieldBox = ({
  values,
  value,
  currentKey,
  clickHandler,
  blurHandler,
  changeHandler,
  initialFormValues,
  userInformation,
  fieldVariant
}) => {
  const location = useLocation();

  // className={
  //   currentKey !== "Password" &&
  //   currentKey !== "NewPassword" &&
  //   currentKey !== "RetypeNewPassword" &&
  //   currentKey !== "Email" &&
  //   currentKey !== "CardHolder" &&
  //   currentKey !== "LongCardNumber"
  //     ? `${styles["field-box"]}`
  //     : `${styles["larger-field-box"]}`
  // }

  return (
    <div key={currentKey} className={`${styles[fieldVariant]}`}>
      {currentKey === "Email" && location.pathname !== "/users/account" && (
        <QuestionMark text={EMAIL_QUESTION_MARK} />
      )}
      {currentKey === "Password" && location.pathname !== "/users/account" && (
        <QuestionMark text={PASSWORD_REQUIREMENTS} />
      )}
      {currentKey === "NewPassword" && (
        <QuestionMark text={PASSWORD_REQUIREMENTS} />
      )}
      <FieldContainer
        values={values}
        value={value}
        clickHandler={clickHandler}
        blurHandler={blurHandler}
        changeHandler={changeHandler}
        initialFormValues={initialFormValues}
        userInformation={userInformation}
        currentKey={currentKey}
      />
      <ErrorMessage values={values} value={value} />
      <SuccessMessage values={values} value={value} />
    </div>
  );
};
