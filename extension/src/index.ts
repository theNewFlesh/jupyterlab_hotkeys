import {JupyterFrontEnd, JupyterFrontEndPlugin} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { CodeMirrorEditor } from '@jupyterlab/codemirror';

class JupyterLabHotkeys {
    private tracker: INotebookTracker;
    private app: JupyterFrontEnd;

    constructor(app: JupyterFrontEnd, tracker: INotebookTracker) {
        this.app = app;
        this.tracker = tracker;
        this.addCommands();
        this.onActiveCellChanged();
        this.tracker.activeCellChanged.connect(this.onActiveCellChanged, this);
    }

    private onActiveCellChanged(): void {
        const activeCell = this.tracker.activeCell;
        if (activeCell !== null) {
           (activeCell.editor as CodeMirrorEditor).setOption('keyMap', 'hotkeys');
        }
    }

    private addCommands() {
        const { commands } = this.app;
        // tslint:disable-next-line
        const self = this;

        function editorExec(id: string) {
            (self.tracker.activeCell.editor as CodeMirrorEditor).editor.execCommand(
                id
            );
        }

        // Vertical up selection
        commands.addCommand('hotkeys:add-cursor-to-prev-line', {
                execute: () => {
                    editorExec('addCursorToPrevLine');
                },
                label: 'Add cursor to previous line'
            }
        );
        commands.addKeyBinding({
            command: 'hotkeys:add-cursor-to-prev-line',
            keys: ['Ctrl ArrowUp'],
            selector: '.CodeMirror-focused'
        });

        // Vertical down selection
        commands.addCommand('hotkeys:add-cursor-to-next-line', {
            execute: () => {
                editorExec('addCursorToNextLine');
            },
            label: 'Add cursor to next line'
            }
        );

        commands.addKeyBinding({
            command: 'hotkeys:add-cursor-to-next-line',
            keys: ['Ctrl ArrowDown'],
            selector: '.CodeMirror-focused'
        });
    }
}

const extension: JupyterFrontEndPlugin<void> = {
    activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
        // tslint:disable-next-line:no-unused-expression
        new JupyterLabHotkeys(app, tracker);
        // tslint:disable-next-line:no-console
        console.log('JupyterLab Hotkeys extension is activated!');
    },
    autoStart: true,
    id: 'hotkeys',
    requires: [INotebookTracker]
};

export default extension;
