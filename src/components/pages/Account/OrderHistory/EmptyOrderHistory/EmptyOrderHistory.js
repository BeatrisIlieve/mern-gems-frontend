import { InfoMessage } from "../../../../reusable/InfoMessage/InfoMessage";
import { Collection } from "../../../../common/Collection/Collection";

export const EmptyOrderHistory = () => {
  return (
    <>
      <InfoMessage
        title={"You have no orders"}
        subtitle={"Explore and add something you love."}
      />
      <Collection />
    </>
  );
};
