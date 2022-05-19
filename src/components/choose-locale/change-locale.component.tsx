import React, { Children, useEffect, useState } from 'react';
import Select from 'carbon-components-react/es/components/Select';
import SelectItem from 'carbon-components-react/es/components/SelectItem';
import styles from './change-locale.component.scss';
import { refetchCurrentUser } from '@openmrs/esm-framework';
import { LoggedInUser } from '../../types';
import { PostUserProperties } from './change-locale.resource';
import countryFlagEmoji from 'country-flag-emoji';

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
            onClick={event => setUserProps({ ...userProps, defaultLocale: event.currentTarget.id })}
            id={locale}
            className={user.userProperties.defaultLocale == locale ? styles.flagSelected : styles.flagUnSelected}>
            {countryFlagEmoji.get(locale == 'en' ? 'us' : locale)['emoji']} {locale}
          </div>
        );
      })}
    </div>
  );
};
export default ChangeLocale;
