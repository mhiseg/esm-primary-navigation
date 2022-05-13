import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { Switcher } from 'carbon-components-react';
import UserAvatarFilledAlt24 from '@carbon/icons-react/es/user--avatar--filled--alt/24';
import styles from './user-panel-profil.component.scss';
import { useTranslation } from "react-i18next";


export default function AppointmentScheduling() {
  const { t } = useTranslation();
  return (
      <div className={styles.Container} >
         <ConfigurableLink to="${openmrsBase}/spa/profil">
         <Switcher aria-label="Switcher Container">
        <UserAvatarFilledAlt24 />
        {t(' profil Change')}
        </Switcher>
        </ConfigurableLink>
      </div>
  );
}
