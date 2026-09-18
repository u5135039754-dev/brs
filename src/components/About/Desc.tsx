import { useState } from 'react';
import classNames from 'classnames';
import './Desc.scss';
import { skills } from '@/utils/skills';
import { useReveal } from '@/hooks/useReveal';

export const Desc = () => {
  const [selected, setSelected] = useState(0);
  const active = skills[selected];
  const container = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>();

  return (
    <div className="desc" id="about">
      <div
        ref={container.ref}
        className={classNames('container', 'reveal-group', { 'reveal-group--visible': container.visible })}
      >
        <div className="about">
          <h3 className="about__sub">01 / about.ts</h3>
          <h1 className="about__title">About me</h1>
          <div className="about__block">
            <span className="about__block-number">01</span>
            <span className="about__block-text">
              I’m a frontend-only developer focused on building clear, responsive interfaces — no backend or Java.
              My core stack is HTML, CSS, SCSS, JavaScript, TypeScript and React.
            </span>
            <span className="about__block-text">
              I use Git and npm for everyday tooling,
              and I’m currently studying for technical interviews on the side.
            </span>
            <span className="about__block-span">
              // open to learning, feedback, and the next challenge
            </span>
          </div>
        </div>
        <div className="skills">
          <h3 className="skills__sub">02 / skills.json</h3>
          <h1 className="skills__title">Skills</h1>
          <div className="skills__block">
            <h2 className="skills__block-title">{active.name}</h2>
            <span className="skills__block-subtitle">
              {active.description}
            </span>
          </div>
          <div
            ref={grid.ref}
            className={classNames('skills__grid', 'reveal-group', { 'reveal-group--visible': grid.visible })}
          >
            {skills.map((skill, i) => (
              <button
                key={skill.name}
                className={i === selected ? 'skills__grid-tile skills__grid-tile--active' : 'skills__grid-tile'}
                onClick={() => setSelected(i)}
              >
                <skill.icon />
                <span className="skills__grid-name">{skill.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}