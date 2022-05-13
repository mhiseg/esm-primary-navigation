import React, { useEffect, useState } from 'react';
import Select from 'carbon-components-react/es/components/Select';
import SelectItem from 'carbon-components-react/es/components/SelectItem';
import styles from './change-locale.component.scss';
import { refetchCurrentUser } from '@openmrs/esm-framework';
import { LoggedInUser } from '../../types';
import { PostUserProperties } from './change-locale.resource';
import countryFlagEmoji from "country-flag-emoji"



export interface ChangeLocaleProps {
  allowedLocales: Array<string>;
  user: LoggedInUser;
  postUserProperties: PostUserProperties;
}

const ChangeLocale: React.FC<ChangeLocaleProps> = ({ allowedLocales, user, postUserProperties }) => {
  const [userProps, setUserProps] = useState(user.userProperties);
  const options = allowedLocales?.map(locale => <option className={styles.flagSelectedOption}
    value={locale}
    selected={user.userProperties.defaultLocale == locale ? true : false} >
    {(countryFlagEmoji.get(locale == 'en' ? 'us' : locale))['emoji']} {locale}</option>);

  useEffect(() => {
    if (user.userProperties.defaultLocale !== userProps.defaultLocale) {
      const ac = new AbortController();
      postUserProperties(user.uuid, userProps, ac).then(() => refetchCurrentUser());
      return () => ac.abort();
    }
  }, [userProps]);

  return (
    <div className={styles.flagComponent} >
      <select
        className={styles.flagSelected}
        onChange={event => setUserProps({ ...userProps, defaultLocale: event.target.value })}
        value={userProps.defaultLocale}>
        {options}
      </select>
    </div>
  );
};

export default ChangeLocale;
