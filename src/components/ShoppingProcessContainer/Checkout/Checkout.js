import { ShoppingProcessContainer } from "../ShoppingProcessContainer";

import { ShippingDetailsForm } from "../../Account/ShippingAndOrders/ShippingDetails/ShippingDetailsForm/ShippingDetailsForm";
import { OrderSummary } from "../OrderSummary/OrderSummary";

export const Checkout = () => {
  return (
    <ShoppingProcessContainer title={"Checkout"}>
      <ShippingDetailsForm />
      <OrderSummary />
    </ShoppingProcessContainer>
  );
};
