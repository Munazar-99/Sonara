import React from 'react';
import { settingsAction } from '../server/actions/settings.action';
import ProfileSettings from './SettingsContent';

async function Settingspage() {
  const data = await settingsAction();

  return <ProfileSettings voices={data.voices} user={data.user} />;
}

export default Settingspage;
