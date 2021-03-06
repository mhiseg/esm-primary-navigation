import React from 'react';
import styles from './HeaderUserInfo.scss';
import UserAvatarFilledAlt32 from '@carbon/icons-react/es/user--avatar/32';
import { Row, Tile, Column } from 'carbon-components-react';

function HeaderUserInfo({ user }) {
  return (
    <div className={styles.HeaderUserInfo}>
      <Tile className={styles.HeaderUserInfoTile}>
        <Row>
          <UserAvatarFilledAlt32 className={styles.userAvatar} />
          <Column md={12} sm={9}>
            <Row className={styles['usernameInfoValue']}>{user.username}</Row>
            <Row className={styles['userInfoFonction']}> {user.systemId.split('-')[0]}</Row>
          </Column>
        </Row>
      </Tile>
    </div>
  );
}
export default HeaderUserInfo;
