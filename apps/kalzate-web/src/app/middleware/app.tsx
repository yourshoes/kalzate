import { hydrateSuccess } from '/app/actions/app';

import Database from '/services/Database';

export async function hydrate() {
  try {
    const state = await Database.init();

    console.log('hydrated!!!');
    return hydrateSuccess(state);
  } catch (error) {
    console.error(error);
    return;
  }
}
