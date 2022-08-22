import React from "react";
import { ConfigurableLink } from "@openmrs/esm-framework";
import { Switcher } from "carbon-components-react";
import styles from "./user-panel-profil.component.scss";
import { useTranslation } from "react-i18next";
import { UserProfile16 } from "@carbon/icons-react";

export default function AppointmentScheduling() {
  const { t } = useTranslation();
  return (
    <div className={styles.Container}>
      <ConfigurableLink to="${openmrsBase}/spa/profil">
        <Switcher aria-label="Switcher Container">
          <UserProfile16 />
          {t("profile")}
        </Switcher>
      </ConfigurableLink>
    </div>
  );
}
