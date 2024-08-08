import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { DynamicForm } from "../DynamicForm/DynamicForm";
import { ContainerTitle } from "../ContainerTitle/ContainerTitle";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import { useBagContext } from "../../contexts/BagContext";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

import { useService } from "../../hooks/useService";
import { useForm } from "../../hooks/useForm";

import { paymentServiceFactory } from "../../services/paymentService";
import { userCardDetailsServiceFactory } from "../../services/userCardDetailsService";

import { checkIfFormErrorHasOccurred } from "../../utils/checkIfFormErrorHasOccurred";
import { clearInitialFormValuesMessages } from "../../utils/clearInitialFormValuesMessages";
import { checkIfCardHasExpired } from "./helpers/checkIfCardHasExpired";
import { setCardHasExpiredErrorMessage } from "./helpers/setCardHasExpiredErrorMessage";
import { getData } from "./helpers/getData";

import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";

export const CardDetailsForm = ({ popupCloseHandler }) => {
  const location = useLocation();

  const [userCardDetails, setUserCardDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const userCardDetailsService = useService(userCardDetailsServiceFactory);

  const paymentService = useService(paymentServiceFactory);

  const { userId } = useAuthenticationContext();

  const { totalPrice } = useBagContext();

  const {
    values,
    setValues,
    clickHandler,
    blurHandler,
    updateForm,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    userCardDetailsService
      .getOne(userId)
      .then((data) => {
        setUserCardDetails(data);

        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userCardDetailsService, userId, updateForm]);

  const { clearShoppingBag } = useBagContext();

  const navigate = useNavigate();

  const locationIsPayment = location.pathname === "/payment";

  const buttonTitle = locationIsPayment
    ? `Place Order $ ${totalPrice}`
    : "Save";

  const onSubmit = async (e) => {
    submitHandler(e);

    const errorOccurred = checkIfFormErrorHasOccurred(values);

    const cardHasExpired = checkIfCardHasExpired(values.expiryDate.fieldValue);

    if (cardHasExpired) {
      let spreadValues = { ...values };

      spreadValues = setCardHasExpiredErrorMessage(spreadValues, FORM_KEYS);

      setValues(spreadValues);

      return;
    }

    if (!errorOccurred) {
      const data = getData(values);

      try {
        setIsLoading(true);

        await userCardDetailsService.update(userId, data);

        if (locationIsPayment) {
          await paymentService.create(userId, data);

          clearShoppingBag();

          navigate("/order-confirmation");
        } else {
          popupCloseHandler();
        }

        clearInitialFormValuesMessages(FORM_KEYS, INITIAL_FORM_VALUES);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ContainerTitle title={"Payment"} />
      <DynamicForm
        values={values}
        formKeys={FORM_KEYS}
        clickHandler={clickHandler}
        blurHandler={blurHandler}
        changeHandler={changeHandler}
        initialFormValues={INITIAL_FORM_VALUES}
        userInformation={userCardDetails}
        buttonTitle={buttonTitle}
        onSubmit={onSubmit}
      />
    </>
  );
};
