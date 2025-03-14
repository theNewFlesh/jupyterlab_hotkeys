import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the jupyterlab_hotkeys extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_hotkeys:plugin',
  description: 'Advanced Hotkeys for Jupyter Lab.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension jupyterlab_hotkeys is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jupyterlab_hotkeys settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for jupyterlab_hotkeys.', reason);
        });
    }
  }
};

export default plugin;
