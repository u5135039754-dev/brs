import type { Tab } from './Hero';

type HeroTabsProps = {
  tabs: Tab[];
  activeId: string;
  setActiveId: (id: string) => void;
  onAddTab: () => void;
  onRemoveTab: (id: string) => void;
};

export const HeroTabs: React.FC<HeroTabsProps> = ({ tabs, activeId, setActiveId, onAddTab, onRemoveTab }) => {
  return (
    <div className="hero__tabs">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={tab.id === activeId ? 'hero__tab hero__tab--active' : 'hero__tab'}
        >
          <button className="hero__tab-select" onClick={() => setActiveId(tab.id)}>
            <span className="hero__tab-icon">{`{}`}</span>
            {tab.title}
          </button>

          {tab.id !== 'portfolio' && (
            <button
              className="hero__tab-close"
              onClick={(event) => {
                event.stopPropagation();
                onRemoveTab(tab.id);
              }}
              aria-label={`Close ${tab.title}`}
            >
              ×
            </button>
          )}
        </div>
      ))}

      <button onClick={onAddTab} className="hero__tab-button" aria-label="New scratch tab">
        +
      </button>
    </div>
  );
};
