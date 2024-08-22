import { useBagContext } from "../../../../contexts/BagContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import styles from "./Quantity.module.css";

export const Quantity = ({ bagId, bagQuantity, inventoryQuantity }) => {
  const { increase, decrease } = useBagContext();

  return (
    <div className={styles["update-quantity"]}>
      <button disabled={inventoryQuantity < 1} className={styles["button"]}>
        <FontAwesomeIcon
          icon={faPlus}
          className={
            inventoryQuantity >= 1 ? styles["enabled"] : styles["disabled"]
          }
          onClick={() => increase(bagId)}
        />
      </button>
      {bagQuantity}
      <FontAwesomeIcon
        icon={faMinus}
        className={styles["enabled"]}
        onClick={() => decrease(bagId)}
      />
    </div>
  );
};
