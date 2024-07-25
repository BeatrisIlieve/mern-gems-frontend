import { createContext, useContext, useState } from "react";

import { BAG_ACTIONS } from "../mappers/bagActions";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bagQuantity, setBagQuantity] = useState(0);

  const updateBagQuantity = (action) => {
    if (action === BAG_ACTIONS.Subtract) {
      setBagQuantity(bagQuantity - 1);
    } else if (action == BAG_ACTIONS.Add) {
      setBagQuantity(bagQuantity + 1);
    }
  };

  const context = {
    bagQuantity,
    updateBagQuantity,
  };

  return <BagContext.Provider value={context}>{children}</BagContext.Provider>;
};

export const useBagContext = () => {
  const context = useContext(BagContext);

  return context;
};
