import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { HeaderPanel } from 'carbon-components-react/es/components/UIShell';
import styles from './app-menu-panel.component.scss';
import { LoggedInUser } from '../../types';

interface AppMenuProps {
  expanded: boolean;
  allowedLocales: Array<string>;
  user: LoggedInUser;
}
const AppMenuChangeLocalPanel: React.FC<AppMenuProps> = ({ expanded, allowedLocales, user }) => {
  return (
    <HeaderPanel className={styles.headerPanel} aria-label="app Change Local" expanded={expanded}>
      <ExtensionSlot
        className={styles.menuLink}
        extensionSlotName="ChangeLocal-panel-slot"
        state={{
          allowedLocales: allowedLocales,
          user: user,
        }}
      />
    </HeaderPanel>
  );
};

export default AppMenuChangeLocalPanel;
