import {JupyterFrontEnd, JupyterFrontEndPlugin} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';

class JupyterLabHotkeys {
    private tracker: INotebookTracker;
    private app: JupyterFrontEnd;

    constructor(app: JupyterFrontEnd, tracker: INotebookTracker) {
        this.app = app;
        this.tracker = tracker;
    }
}

const extension: JupyterFrontEndPlugin<void> = {
    activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
        // tslint:disable-next-line:no-unused-expression
        new JupyterLabHotkeys(app, tracker);
        // tslint:disable-next-line:no-console
        console.log('JupyterLab Hotkeys is activated!');
    },
    autoStart: true,
    id: 'jupyterlab_hotkeys',
    requires: [INotebookTracker]
};

export default extension;
