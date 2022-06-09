import React, { useEffect, useState } from 'react';
import styles from './change-locale.component.scss';
import { refetchCurrentUser } from '@openmrs/esm-framework';
import { LoggedInUser } from '../../types';
import { PostUserProperties } from './change-locale.resource';
import { Icon } from '@iconify/react';

export interface ChangeLocaleProps {
  allowedLocales: Array<string>;
  user: LoggedInUser;
  postUserProperties: PostUserProperties;
}
const ChangeLocale: React.FC<ChangeLocaleProps> = ({ allowedLocales, user, postUserProperties }) => {
  const [userProps, setUserProps] = useState(user.userProperties);

  useEffect(() => {
    if (user.userProperties.defaultLocale !== userProps.defaultLocale) {
      const ac = new AbortController();
      postUserProperties(user.uuid, userProps, ac).then(() => refetchCurrentUser());
      return () => ac.abort();
    }
  }, [userProps]);
  return (
    <div className={styles.flagComponent}>
      {allowedLocales?.map(function(locale) {
        return (
          <div
            onClick={event =>
              setUserProps({
                ...userProps,
                defaultLocale: event.currentTarget.id,
                proficientLocales: event.currentTarget.id,
              })
            }
            id={locale}
            className={user.userProperties.defaultLocale == locale ? styles.flagSelected : styles.flagUnSelected}>
             <i> <Icon icon={"cif:"+(locale == 'en' ? 'us' : locale)} /> </i> {locale}
          </div>
        );
      })}
    </div>
  );
};
export default ChangeLocale;