import { useState } from 'react';
import { Desc } from '../About/Desc';
import { Hero, type Tab } from '../Hero/Hero';
import { Work } from '../Work/Work';
import { ScratchPad } from '../ScratchPad/ScratchPad';
import { Footer } from '../Footer/Footer';
import './Main.scss';

export const Main = () => {
  const [activeId, setActiveId] = useState('portfolio');
  const [tabs, setTabs] = useState<Tab[]>([{ id: 'portfolio', title: 'portfolio.tsx' }]);
  const [count, setCount] = useState(0);
  const [activeSection, setActiveSection] = useState('top');

  const addTab = () => {
    const next = count + 1;
    const id = `scratch-${next}`;
    const newTab: Tab = { id, title: `scratch-${next}.js`, code: `console.log('Hello!');` };

    setTabs((prev) => [...prev, newTab]);
    setActiveId(id);
    setCount(next);
  };

  const removeTab = (id: string) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== id));

    if (activeId === id) {
      setActiveId('portfolio');
    }
  };

  return (
    <main className="main">
      {activeId === 'portfolio' ? (
        <><Hero activeSection={activeSection} setActiveSection={setActiveSection} tabs={tabs} addTab={addTab} removeTab={removeTab} activeId={activeId} setActiveId={setActiveId} /><Desc /><Work /><Footer /></>
      ) : (
          <ScratchPad
            onChange={(newCode) =>
            setTabs((prev) => prev.map((t) => (t.id === activeId ? { ...t, code: newCode } : t)))
            } tabs={tabs}
            activeId={activeId}
            setActiveId={setActiveId}
            onAddTab={addTab}
            onRemoveTab={removeTab}
            code={tabs.find((t) => t.id === activeId)?.code ?? ''} />
      )}
    </main>
  )
}
