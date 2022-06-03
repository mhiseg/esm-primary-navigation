import React, { useState } from 'react';
import Switcher20 from '@carbon/icons-react/lib/switcher/20';
import Close20 from '@carbon/icons-react/lib/close/20';
import UserMenuPanel from '../navbar-header-panels/user-menu-panel.component';
import SideMenuPanel from '../navbar-header-panels/side-menu-panel.component';
import Logo from '../logo/logo.component';
import AppMenuPanel from '../navbar-header-panels/app-menu-panel.component';
import styles from './navbar.component.scss';
import HeaderUserInfo from './HeaderUserInfo';
import { useLayoutType, navigate } from '@openmrs/esm-framework';
import countryFlagEmoji from 'country-flag-emoji';
import { LoggedInUser, UserSession } from '../../types';
import { isDesktop } from '../../utils';
import AppMenuChangeLocalPanel from '../navbar-header-panels/app-menu-change-local-panel.component';

import {
  HeaderContainer,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react/es/components/UIShell';
const HeaderLink: any = HeaderName;

export interface NavbarProps {
  user: LoggedInUser;
  allowedLocales: Array<string>;
  onLogout(): void;
  session: UserSession;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, allowedLocales, session }) => {
  const layout = useLayoutType();
  const [userLogin, setUserLogin] = useState(user);
  const [activeHeaderPanel, setActiveHeaderPanel] = React.useState<string>(null);

  const isActivePanel = React.useCallback((panelName: string) => activeHeaderPanel === panelName, [activeHeaderPanel]);

  const togglePanel = React.useCallback(
    (panelName: string) =>
      setActiveHeaderPanel(activeHeaderPanel => (activeHeaderPanel === panelName ? null : panelName)),
    [],
  );

  const hidePanel = React.useCallback(() => {
    setActiveHeaderPanel(null);
  }, []);

  const render = React.useCallback(() => {
    const Icon = isActivePanel('appMenu') ? Close20 : Switcher20;

    const getLanguage = user => {
      if (typeof user?.userProperties?.defaultLocale == 'undefined') {
        localStorage.setItem('i18nextLng', 'fr');
        return 'fr';
      }
      return user.userProperties.defaultLocale == 'en' ? 'us' : user.userProperties.defaultLocale;
    };

    return (
      <Header aria-label="OpenMRS" className={styles.navbarHeader}>
        <HeaderLink
          prefix=""
          onClick={() => {
            navigate({ to: '${openmrsSpaBase}/home' });
            hidePanel();
          }}>
          <Logo />
        </HeaderLink>

        <HeaderGlobalBar
          className={styles.HeaderGlobalBar}
          aria-label="Users"
          aria-labelledby="Users Avatar Icon"
          name="Users">
          <HeaderGlobalAction
            aria-label="App Change user"
            isActive={isActivePanel('user-panel-slot')}
            aria-labelledby="App change user"
            className={styles.HeaderUserPanel}
            style={{ backgroundColor: styles['brand-01'] }}
            onClick={() => {
              togglePanel('user-panel-slot');
            }}>
            <HeaderUserInfo user={user} />
          </HeaderGlobalAction>

          <HeaderGlobalAction
            aria-label="App Change local"
            isActive={isActivePanel('ChangeLocal-panel-slot')}
            aria-labelledby="App change local"
            style={{ backgroundColor: styles['brand-01'] }}
            onClick={() => togglePanel('ChangeLocal-panel-slot')}>
            {countryFlagEmoji.get(getLanguage(user))['emoji']}
          </HeaderGlobalAction>

          <HeaderGlobalAction
            aria-label="App Menu"
            isActive={isActivePanel('appMenu')}
            aria-labelledby="App Menu"
            style={{ backgroundColor: styles['brand-01'] }}
            onClick={() => togglePanel('appMenu')}>
            <Icon />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        {!isDesktop(layout) && <SideMenuPanel hidePanel={hidePanel} expanded={isActivePanel('sideMenu')} />}
        <AppMenuPanel expanded={isActivePanel('appMenu')} />

        <AppMenuChangeLocalPanel
          expanded={isActivePanel('ChangeLocal-panel-slot')}
          allowedLocales={allowedLocales}
          user={user}
        />
        <UserMenuPanel session={session} expanded={isActivePanel('user-panel-slot')} onLogout={onLogout} />
      </Header>
    );
  }, [session, user, allowedLocales, isActivePanel, layout, hidePanel, togglePanel]);

  return <div>{session && <HeaderContainer render={render} />}</div>;
};
export default Navbar;
