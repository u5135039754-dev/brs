import classNames from 'classnames';
import './Work.scss';

import { workMock } from '../../utils/mock';
import { useReveal } from '@/hooks/useReveal';

export const Work = () => {
  const grid = useReveal<HTMLDivElement>();

  return (
    <div className="work" id="work">
      <div className="work__text">
        <span className="work__sub">03 / projects</span>
        <h1 className="work__title">Selected work</h1>
        <span className="work__subtitle">
          // three files, one growing frontend practice
        </span>
      </div>
      <div
        ref={grid.ref}
        className={classNames('work__grid', 'reveal-group', { 'reveal-group--visible': grid.visible })}
      >
        {workMock.map((project, index) => (
          <div key={index} className="work__project">
            <div className={`work__project-top work__project-top--${project.accent}`}>
              <h2 className="work__project-top-title">{project.fileName}</h2>
              <div className="work__project-top-button">×</div>
            </div>
            <div className="work__project-bottom">
              <span className={`work__project-quantity work__project-quantity--${project.accent}`}>{project.type === 'solo' ? 'Solo Project' : 'Team Project'}</span>
              <h2 className="work__project-title">{project.title}</h2>
              <p className="work__project-description">
                // {project.description}
              </p>
              <div className="work__project-langUsed">
                {project.tags.map((tag) => (
                  <span className="work__project-lang">{tag}</span>
                ))}
              </div>
              <a href={project.githubUrl} className="work__project-git">→ view on GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}