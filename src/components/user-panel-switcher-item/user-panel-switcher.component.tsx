import UserAvatarFilledAlt20 from '@carbon/icons-react/es/user--avatar--filled--alt/20';
import Switcher from 'carbon-components-react/lib/components/UIShell/Switcher';
import SwitcherDivider from 'carbon-components-react/lib/components/UIShell/SwitcherDivider';
import React from 'react';
import { LoggedInUser } from '../../types';
import Logout from '../logout/logout.component';
import styles from './user-panel-switcher.component.scss';
import root from '../../root.scss'

export interface UserPanelSwitcherItemProps {
  user: LoggedInUser;
  isLogoutEnabled: boolean;
  onLogout(): void;
}

const UserPanelSwitcher: React.FC<UserPanelSwitcherItemProps> = ({ user, isLogoutEnabled, onLogout }) => (
  <div className={styles.switcherContainer}>
    {isLogoutEnabled && (
      <>
       
        <Switcher aria-label="Switcher Container">
          <Logout onLogout={onLogout} />
        </Switcher>
      </>
    )}
  </div>
);

export default UserPanelSwitcher;
