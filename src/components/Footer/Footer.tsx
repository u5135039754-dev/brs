import classNames from 'classnames';
import { footerMock } from '@/utils/mock';
import { useReveal } from '@/hooks/useReveal';
import './Footer.scss';

export const Footer = () => {
  const grid = useReveal<HTMLDivElement>();

  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="footer__text">
          <span className="footer__sub">04 / contact.env</span>
          <h1 className="footer__title">Let’s connect</h1>
          <p className="footer__subtitle">
            // available for junior frontend opportunities
          </p>
        </div>
        <div
          ref={grid.ref}
          className={classNames('footer__grid', 'reveal-group', { 'reveal-group--visible': grid.visible })}
        >
          {footerMock.map(({ label, value, href, accent }) => (
            <a href={href} className="footer__block" key={label}>
              <h3 className={`footer__block-name footer__block-name--${accent}`}>{label}</h3>
              <div className="footer__link">
                {value}
              </div>
            </a>
          ))}
        </div>
        <div className="footer__bottom">
          <span className="footer__branch">⑂ main</span>
          <span className="footer__info">
            Borys Torzhanskyi · 2026 · UTF-8
          </span>
        </div>
      </div>
    </footer>
  )
}