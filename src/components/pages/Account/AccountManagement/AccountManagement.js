import { useState, useEffect, useCallback } from "react";

import { Logout } from "./Logout/Logout";
import { NormalTitle } from "../../../reusable/NormalTitle/NormalTitle";
import { LargeTitle } from "../../../reusable/LargeTitle/LargeTitle";
import { UpdateEmailForm } from "./UpdateEmailForm/UpdateEmailForm";
import { UpdatePasswordForm } from "./UpdatePasswordForm/UpdatePasswordForm";
import { Button } from "../../../reusable/Button/Button";

import { useLanguageContext } from "../../../../contexts/LanguageContext";
import { useAuthenticationContext } from "../../../../contexts/AuthenticationContext";

import { useService } from "../../../../hooks/useService";

import { userLoginDetailsServiceFactory } from "../../../../services/userLoginDetailsService";

import {
  ACCOUNT_MANAGEMENT_NAMING,
  UPDATE_EMAIL_TITLE_NAMING,
  UPDATE_PASSWORD_TITLE_NAMING,
} from "./constants/languageRelated";

import styles from "./AccountManagement.module.css";

export const AccountManagement = () => {
  const { language } = useLanguageContext();

  const [userEmail, setUserEmail] = useState([]);

  const updateUserEmail = useCallback((email) => {
    setUserEmail(email);
  }, []);

  const { userId } = useAuthenticationContext();

  const userLoginDetailsService = useService(userLoginDetailsServiceFactory);

  useEffect(() => {
    userLoginDetailsService
      .getOne(userId)
      .then((data) => {
        setUserEmail(data.email);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userLoginDetailsService, userId]);

  const [displayUpdateEmail, setDisplayUpdateEmailForm] = useState(false);

  const [displayUpdatePassword, setDisplayUpdatePasswordForm] = useState(false);

  const updateEmailClickHandler = useCallback(() => {
    setDisplayUpdateEmailForm(true);
    setDisplayUpdatePasswordForm(false);
  }, []);

  const updatePasswordClickHandler = useCallback(() => {
    setDisplayUpdatePasswordForm(true);
    setDisplayUpdateEmailForm(false);
  }, []);

  const closeUpdateEmailClickHandler = useCallback(() => {
    setDisplayUpdateEmailForm(false);
  }, []);

  const closeUpdatePasswordClickHandler = useCallback(() => {
    setDisplayUpdatePasswordForm(false);
  }, []);

  const title = ACCOUNT_MANAGEMENT_NAMING[language];

  const updateEmailButtonTitle = UPDATE_EMAIL_TITLE_NAMING[language];
  const updatePasswordButtonTitle = UPDATE_PASSWORD_TITLE_NAMING[language];

  return (
    <section className={styles["account-management"]}>
      <LargeTitle title={title} />
      <NormalTitle title={userEmail} variant={"bolded"} />
      <div className={styles["buttons-container"]}>
        <Button
          title={updateEmailButtonTitle}
          callBackFunction={updateEmailClickHandler}
          variant={"underlined"}
        />
        <Button
          title={updatePasswordButtonTitle}
          callBackFunction={updatePasswordClickHandler}
          variant={"underlined"}
        />
        <Logout />
        {displayUpdateEmail && (
          <UpdateEmailForm
            updateUserEmail={updateUserEmail}
            closeUpdateEmailClickHandler={closeUpdateEmailClickHandler}
          />
        )}
        {displayUpdatePassword && (
          <UpdatePasswordForm
            closeUpdatePasswordClickHandler={closeUpdatePasswordClickHandler}
          />
        )}
      </div>
    </section>
  );
};
