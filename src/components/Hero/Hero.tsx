import './Hero.scss';
import status from '../../assets/icons/Status.svg';
import status1 from '../../assets/icons/Window control.svg';
import status2 from '../../assets/icons/Window control2.svg';
import status3 from '../../assets/icons/Window control3.svg';
import classNames from 'classnames';
import { useEffect } from 'react';
import { HeroTabs } from './HeroTabs';
import { useReveal } from '@/hooks/useReveal';

type HeroProps = {
  activeId: string;
  setActiveId: (id: string) => void;
  tabs: Tab[];
  addTab: () => void;
  removeTab: (id: string) => void;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
};

export interface Tab {
  id: string;
  title: string;
  code?: string;
}

const sections = [
  { id: 'top', icon: '⌂' },
  { id: 'about', icon: '⌕' },
  { id: 'work', icon: '⑂' },
  { id: 'contact', icon: '▦' },
];

export const Hero: React.FC<HeroProps> = ({ activeId, setActiveId, tabs, addTab, removeTab, activeSection, setActiveSection }) => {
  const left = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>();

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="hero">
      <div className="hero__sidebar">
        {sections.map(({ id, icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className={classNames('hero__sidebar-icon', {
              'hero__sidebar-icon-active': activeSection === id,
            })}
          >
            {icon}
          </a>
        ))}
      </div>
      <div className="hero__main">
        <HeroTabs tabs={tabs} activeId={activeId} setActiveId={setActiveId} onAddTab={addTab} onRemoveTab={removeTab} />
        <div className="hero__content">
          <div className="hero__body">
          <div
            ref={left.ref}
            className={classNames('hero__left', 'reveal', { 'reveal--visible': left.visible })}
          >
            <div className="hero__path">
              {`src › `}
              <span className="hero__path-item">intro.ts</span>
            </div>
            <div className="hero__text">
              <div className="hero__row">
                <span className="hero__line">01</span>
                <span className="hero__dev">
                  <span className="hero__dev-keyword">const</span>
                  {` developer = {`}
                </span>
              </div>
              <div className="hero__row">
                <span className="hero__line">02</span>
                <h1 className="hero__title">Borys Torzhanskyi</h1>
              </div>
              <div className="hero__row">
                <span className="hero__line">03</span>
                <h2 className="hero__subtitle">Junior Frontend Developer</h2>
              </div>
              <div className="hero__row">
                <span className="hero__line">04</span>
                <span className="hero__status">
                  <img src={status} alt="Status" />
                  <span className="hero__status-span">based in Italy</span>
                </span>
              </div>
              <div className="hero__row">
                <span className="hero__line">05</span>
                <div className="hero__update">
                  <span className="hero__update-title">// latest update</span>
                  <span className="hero__update-desc">
                    Recently completed the Mate Academy
                    Frontend Developer course and currently
                    in an employment stage (internship / trial period).
                  </span>
                </div>
              </div>
              <div className="hero__row">
                <span className="hero__line">06</span>
                <span className="hero__dev">{`}`}</span>
              </div>
            </div>
          </div>
          <div
            ref={right.ref}
            className={classNames('hero__right', 'reveal', { 'reveal--visible': right.visible })}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="hero__code">
              <div className="hero__code-top">
                <div className="hero__window">
                  <img src={status1} alt="Window Control" />
                  <img src={status2} alt="Window Control" />
                  <img src={status3} alt="Window Control" />
                </div>
                <div className="hero__name">
                  {`{}`}
                  <span className="hero__name-text">whoami.js</span>
                </div>
              </div>
              <div className="hero__code-content">
                <span className="hero__code-line">
                  <span className="hero__code-keyword">const</span> developer = {`{`}
                </span>
                <span className="hero__code-line">
                  <span className="hero__code-first">{`  `}name</span>: <span className="hero__code-second">'Borys Torzhanskyi</span>',
                </span>
                <span className="hero__code-line">
                  <span className="hero__code-first">{`  `}role</span>: <span className="hero__code-second">'Junior Frontend Developer</span>',
                </span>
                <span className="hero__code-line">
                    <span className="hero__code-first">{`  `}location</span>: <span className="hero__code-second">'Italy'</span>,
                </span>
                <span className="hero__code-line">
                    <span className="hero__code-first">{`  `}stack</span>: [<span className="hero__code-second">'HTML'</span>, <span className="hero__code-second">'CSS'</span>, <span className="hero__code-second">'SCSS'</span>, <br/> <span className="hero__code-second">'JavaScript'</span>, <span className="hero__code-second">'TypeScript'</span>, <span className="hero__code-second">'React'</span>],
                </span>
                <span className="hero__code-line">
                    <span className="hero__code-first">{`  `}status</span>: <span className="hero__code-second">'open to work'</span>
                </span>
                <span className="hero__code-line">
                  {`};`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}
