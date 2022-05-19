import React from 'react';
import styles from './HeaderUserInfo.scss';
import UserAvatarFilledAlt32 from '@carbon/icons-react/es/user--avatar/32';
import { Row, Tile, Column } from 'carbon-components-react';
import { postUserPropertiesOnline, postUserPropertiesOffline } from '../choose-locale/change-locale.resource';
import ChangeLocale from '../choose-locale/change-locale.component';
import { max } from 'lodash-es';

function HeaderUserInfo({ user, onClickChange, allowedLocales }) {
  return (
    <div className={styles.HeaderUserInfo}>
      <Tile className={styles.HeaderUserInfoTile} onClick={onClickChange}>
        <Row>
          <Column>
            <UserAvatarFilledAlt32 onClick={onClickChange} className={styles.userAvatar} />
          </Column>
          <Column md={12} sm={9}>
            <Row className={styles['usernameInfoValue']}>{user.person.display}</Row>
            <Row className={styles['userInfoFonction']}> {user.systemId.split('-')[0]}</Row>
          </Column>
        </Row>
      </Tile>
    </div>
  );
}
export default HeaderUserInfo;
