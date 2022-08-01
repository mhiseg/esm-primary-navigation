import React, { useEffect, useState } from "react";
import styles from "./change-locale.component.scss";
import { refetchCurrentUser } from "@openmrs/esm-framework";
import { LoggedInUser } from "../../types";
import { PostUserProperties } from "./change-locale.resource";
import { Icon } from "@iconify/react";
import { getExtensionFlag } from "../../root.resource";

export interface ChangeLocaleProps {
  allowedLocales: Array<string>;
  user: LoggedInUser;
  postUserProperties: PostUserProperties;
}
const ChangeLocale: React.FC<ChangeLocaleProps> = ({
  allowedLocales,
  user,
  postUserProperties,
}) => {
  const [userProps, setUserProps] = useState(user.userProperties);

  useEffect(() => {
    if (user.userProperties.defaultLocale !== userProps.defaultLocale) {
      const ac = new AbortController();
      postUserProperties(user.uuid, userProps, ac).then(() =>
        refetchCurrentUser()
      );
      return () => ac.abort();
    }
  }, [userProps]);

  const getLanguageText = (local) => {
    switch (local) {
      case "en":
        return "English";
      case "fr":
        return "Français";
      case "kr":
        return "Kreyòl";
    }
  };
  return (
    <div className={styles.flagComponent}>
      {allowedLocales?.map(function (locale) {
        return (
          <div
            onClick={(event) =>
              setUserProps({
                ...userProps,
                defaultLocale: event.currentTarget.id,
                proficientLocales: event.currentTarget.id,
              })
            }
            id={locale}
            className={
              user.userProperties.defaultLocale == locale
                ? styles.flagSelected
                : styles.flagUnSelected
            }
          >
            <i>
              {" "}
              <Icon icon={"cif:" + getExtensionFlag(locale)} width={20} />{" "}
            </i>{" "}
            {getLanguageText(locale)}
          </div>
        );
      })}
    </div>
  );
};
export default ChangeLocale;
