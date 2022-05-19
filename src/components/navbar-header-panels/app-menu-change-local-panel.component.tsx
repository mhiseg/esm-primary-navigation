import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { HeaderPanel } from 'carbon-components-react/es/components/UIShell';
import styles from './app-menu-panel.component.scss';

interface AppMenuProps {
  expanded: boolean;
  allowedLocales: Array<string>;
  user: any;
}
const AppMenuChangeLocalPanel: React.FC<AppMenuProps> = ({ expanded, allowedLocales, user }) => {
  return (
    <HeaderPanel className={styles.headerPanel} aria-label="app Change Local" expanded={expanded}>
      <ExtensionSlot
        className={styles.menuLink}
        extensionSlotName="appChangeLocal"
        state={{
          allowedLocales: allowedLocales,
          user: user,
        }}
      />
    </HeaderPanel>
  );
};

export default AppMenuChangeLocalPanel;
