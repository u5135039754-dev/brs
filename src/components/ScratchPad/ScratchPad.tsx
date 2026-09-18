import { useState } from 'react';
import { EditorView } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import CodeMirror from '@uiw/react-codemirror';
import type { Statistics } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import classNames from 'classnames';
import type { Tab } from "../Hero/Hero";
import { HeroTabs } from "../Hero/HeroTabs";
import '../Hero/Hero.scss';
import './ScratchPad.scss';

type Props = {
  code: string;
  activeId: string;
  setActiveId: (id: string) => void;
  tabs: Tab[];
  onAddTab: () => void;
  onRemoveTab: (id: string) => void;
  onChange: (newCode: string) => void;
}

const customTheme = Prec.highest(
  EditorView.theme({
    '&': {
      backgroundColor: '#0D1117',
      color: '#c9d1d9',
    },
    '.cm-content': {
      fontFamily: "'Roboto Mono', monospace",
      fontSize: '15px',
      lineHeight: '1.6',
      caretColor: '#c9d1d9',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#c9d1d9',
      borderLeftWidth: '1.5px',
    },
    '.cm-gutters': {
      backgroundColor: '#0D1117',
      border: 'none',
      color: '#6e7681',
      fontSize: '15px',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      color: '#6e7681',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(110, 118, 129, 0.08)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'rgba(110, 118, 129, 0.08)',
      color: '#c9d1d9',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: '#264f78 !important',
    },
    '.cm-selectionMatch': {
      backgroundColor: 'rgba(110, 118, 129, 0.2)',
    },
    '.cm-matchingBracket, .cm-nonmatchingBracket': {
      backgroundColor: 'rgba(110, 118, 129, 0.25)',
      outline: '1px solid #6e7681',
    },
    '.cm-scroller': {
      fontFamily: "'Roboto Mono', monospace",
    },
    '&.cm-focused': {
      outline: 'none',
    },
  })
);

const sidebarIcons = [
  { id: 'explorer', icon: '⌂' },
  { id: 'search', icon: '⌕' },
  { id: 'git', icon: '⑂' },
  { id: 'extensions', icon: '▦' },
];

export const ScratchPad: React.FC<Props> = ({ code, activeId, setActiveId, tabs, onAddTab, onRemoveTab, onChange }) => {
  const [activeIcon, setActiveIcon] = useState('explorer');
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const activeTab = tabs.find((tab) => tab.id === activeId);

  const handleStatistics = (data: Statistics) => {
    const head = data.selectionAsSingle.head;
    setCursor({ line: data.line.number, col: head - data.line.from + 1 });
  };

  return (
    <div className="scratchpad">
      <div className="scratchpad__workbench">
        <div className="hero__sidebar">
          {sidebarIcons.map(({ id, icon }) => (
            <button
              key={id}
              type="button"
              className={classNames('hero__sidebar-icon', {
                'hero__sidebar-icon-active': id === activeIcon,
              })}
              onClick={() => setActiveIcon(id)}
              aria-label={id}
            >
              {icon}
            </button>
          ))}
        </div>
        <div className="scratchpad__editor-group">
          <HeroTabs tabs={tabs} activeId={activeId} setActiveId={setActiveId} onAddTab={onAddTab} onRemoveTab={onRemoveTab} />
          <div className="scratchpad__breadcrumb">
            {`src › `}
            <span className="scratchpad__breadcrumb-item">{activeTab?.title}</span>
          </div>
          <CodeMirror
            value={code}
            onChange={(value) => onChange(value)}
            onStatistics={handleStatistics}
            theme={vscodeDark}
            extensions={[javascript({ jsx: true }), customTheme]}
            height="100%"
            className="scratchpad__editor"
          />
        </div>
      </div>
      <div className="scratchpad__statusbar">
        <div className="scratchpad__statusbar-group">
          <span className="scratchpad__statusbar-item">⑂ main</span>
        </div>
        <div className="scratchpad__statusbar-group">
          <span className="scratchpad__statusbar-item">{`Ln ${cursor.line}, Col ${cursor.col}`}</span>
          <span className="scratchpad__statusbar-item">Spaces: 2</span>
          <span className="scratchpad__statusbar-item">UTF-8</span>
          <span className="scratchpad__statusbar-item">JavaScript</span>
        </div>
      </div>
    </div>
  );
}
