import { useNavigate } from "react-router-dom";

import { MiniImage } from "../../MiniImage/MiniImage";
import { Paragraph } from "../../../../../reusable/Paragraph/Paragraph";
import { LargeTitle } from "../../../../../reusable/LargeTitle/LargeTitle";
import { Button } from "../../../../../reusable/Button/Button";

import { IMAGE_BY_URL_AND_VARIANT } from "./constants/imagesByUrlAndVariant";

import styles from "./Description.module.css";

export const Description = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/collection");
  };

  return (
    <div className={styles["description"]}>
      <div className={styles["description-wrapper"]}>
        <div className={styles["outer-wrapper"]}>
          <MiniImage
            imageUrl={IMAGE_BY_URL_AND_VARIANT.butterfly.imageUrl}
            variant={IMAGE_BY_URL_AND_VARIANT.butterfly.variant}
            waveEffect={IMAGE_BY_URL_AND_VARIANT.butterfly.waveEffect}
          />
          <LargeTitle
            title={"Forget-Me-Not Collection"}
            textAlign={"align-center"}
          />
          <div className={styles["inner-wrapper"]}>
            <MiniImage
              imageUrl={IMAGE_BY_URL_AND_VARIANT.white.imageUrl}
              variant={IMAGE_BY_URL_AND_VARIANT.white.variant}
              waveEffect={IMAGE_BY_URL_AND_VARIANT.white.waveEffect}
            />
            <Paragraph
              text={
                "The enchanting and delicate beauty of a Forget-Me-Not flower in bloom is captured in a series of fine jewelry designs that celebrate the endless beauty of nature’s greatest gifts – rare gemstones and flowers in bloom."
              }
              textAlign={"center"}
            />
            <div className={styles["button"]}>
              <Button
                variant={"white"}
                title={"Discover"}
                callBackFunction={clickHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
