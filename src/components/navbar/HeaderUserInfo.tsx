import React from "react";
import styles from "./HeaderUserInfo.scss";
import UserAvatarFilledAlt32 from "@carbon/icons-react/es/user--avatar/32";
import { Row, Column, Tile } from "carbon-components-react";
import { useTranslation } from "react-i18next";

function HeaderUserInfo({ user }) {
  const { t } = useTranslation();
  return (
    <div className={styles.HeaderUserInfo}>
      <Tile className={styles.HeaderUserInfoTile}>
        <Row className={styles.HeaderContent}>
          <UserAvatarFilledAlt32 className={styles.userAvatar} />
          <Column>
            <Row className={styles["usernameInfoValue"]}>
              {user.person.display}
              {/* {user?.person?.names[0]?.familyName +
                ", " +
                user?.person?.names[0]?.givenName} */}
            </Row>
            <Row className={styles["userInfoFonction"]}>
              {" "}
              {t(user.systemId.split("-")[0])}
            </Row>
          </Column>
        </Row>
      </Tile>
    </div>
  );
}
export default HeaderUserInfo;
