import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { DynamicForm } from "../../reusable/DynamicForm/DynamicForm";

import { useLanguageContext } from "../../../contexts/LanguageContext";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";

import { useForm } from "../../../hooks/useForm";
import { useService } from "../../../hooks/useService";

import { userShippingDetailsServiceFactory } from "../../../services/userShippingDetailsService";

import { checkIfFormErrorHasOccurred } from "../../../utils/checkIfFormErrorHasOccurred";
import { clearInitialFormValuesMessages } from "../../../utils/clearInitialFormValuesMessages";

import { getData } from "./helpers/getData";

import {
  CONTINUE_CHECKOUT_BUTTON_NAMING,
  SAVE_BUTTON_NAMING,
} from "../../../constants/languageRelated";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./constants/initialFormValues";

export const ShippingDetailsForm = ({ popupCloseHandler }) => {
  const { language } = useLanguageContext();

  const [isLoading, setIsLoading] = useState(false);

  const [userShippingDetails, setUserShippingDetails] = useState([]);

  const navigate = useNavigate();

  const { userId } = useAuthenticationContext();

  const userShippingDetailsService = useService(
    userShippingDetailsServiceFactory
  );

  const {
    values,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
    updateForm,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    userShippingDetailsService
      .getOne(userId)
      .then((data) => {
        setUserShippingDetails(data);

        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userShippingDetailsService, userId, updateForm]);

  const onSubmit = useCallback(
    async (e) => {
      submitHandler(e);

      const errorOccurred = checkIfFormErrorHasOccurred(values);

      if (!errorOccurred) {
        const data = getData(values);

        try {
          setIsLoading(true);

          await userShippingDetailsService.update(userId, data);

          if (popupCloseHandler) {
            popupCloseHandler();
          } else {
            navigate("/checkout/payment");
          }
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      clearInitialFormValuesMessages(FORM_KEYS, INITIAL_FORM_VALUES);
    },
    [
      userShippingDetailsService,
      userId,
      values,
      popupCloseHandler,
      navigate,
      submitHandler,
    ]
  );

  const buttonTitle = useMemo(() => {
    return popupCloseHandler
      ? SAVE_BUTTON_NAMING[language]
      : CONTINUE_CHECKOUT_BUTTON_NAMING[language];
  }, [popupCloseHandler]);

  return (
    <>
      <DynamicForm
        values={values}
        formKeys={FORM_KEYS}
        clickHandler={clickHandler}
        blurHandler={blurHandler}
        changeHandler={changeHandler}
        initialFormValues={INITIAL_FORM_VALUES}
        userInformation={userShippingDetails}
        buttonTitle={buttonTitle}
        onSubmit={onSubmit}
        isLoading={isLoading}
        formVariant={"wrapped-form"}
        fieldVariant={"small-field-box"}
      />
    </>
  );
};
