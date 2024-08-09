import { useState, useEffect } from "react";

import { EmptyOrderHistory } from "./EmptyOrderHistory/EmptyOrderHistory";
import { NonEmptyOrderHistory } from "./NonEmptyOrderHistory/NonEmptyOrderHistory";
import { SectionContainer } from "../SectionContainer/SectionContainer";
import { Popup } from "../../Popup/Popup";

import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";

import { useService } from "../../../hooks/useService";

import { orderServiceFactory } from "../../../services/orderService";

import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export const OrderHistory = () => {
  const [orderItems, setOrderItems] = useState([]);

  const { userId } = useAuthenticationContext();

  const orderService = useService(orderServiceFactory);

  useEffect(() => {
    orderService
      .getAll(userId)
      .then((data) => {
        setOrderItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [orderService, userId]);

  const [displayPopup, setDisplayPopup] = useState(false);

  const toggleDisplayPopup = () => {
    setDisplayPopup((displayPopup) => !displayPopup);
  };

  return (
    <>
      <SectionContainer
        sectionTitle={"Order History"}
        callBackFunction={toggleDisplayPopup}
        icon={faClockRotateLeft}
        buttonTitle={"View Order History"}
      />
      {displayPopup && (
        <Popup
          popupCloseHandler={toggleDisplayPopup}
          title={"Order History"}
          variant={"large"}
        >
          {orderItems.length < 1 ? (
            <EmptyOrderHistory />
          ) : (
            <NonEmptyOrderHistory orderItems={orderItems} />
          )}
        </Popup>
      )}
    </>
  );
};
