import {
  CurrentUserWithResponseOption,
  getCurrentUser,
  openmrsObservableFetch,
} from "@openmrs/esm-framework";
import { mergeMap } from "rxjs/operators";
import { PrimaryNavigationDb } from "./offline";

export function getCurrentSession() {
  return openmrsObservableFetch(`/ws/rest/v1/session`);
}

/**
 * Returns an observable producing the current user, but also applies any unsynchronized user property
 * changes to that user.
 */
export function getSynchronizedCurrentUser(
  opts: CurrentUserWithResponseOption
) {
  return getCurrentUser(opts).pipe(
    mergeMap(async (user) => {
      user["allowedLocales"] = ["en", "fr", "kr"];
      if (user.user) {
        const db = new PrimaryNavigationDb();
        const queuedChangeEntries = await db.userPropertiesChanges
          .where({ userUuid: user.user.uuid })
          .toArray();
        const queuedChanges = queuedChangeEntries.map((entry) => entry.changes);
        Object.assign(user.user.userProperties, ...queuedChanges);
      }

      return user;
    })
  );
}

export const getExtensionFlag = (extension) => {
  switch (extension) {
    case undefined:
      localStorage.setItem("i18nextLng", "fr");
      return "fr";
    case "en":
      return "us";
    case "kr":
      return "ht";
    default:
      return extension;
  }
};
