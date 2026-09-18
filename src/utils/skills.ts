import type { IconType } from 'react-icons';
import {
  SiHtml5,
  SiSass,
  SiVite,
  SiFigma,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiGit,
  SiGithub,
  SiNodedotjs,
} from 'react-icons/si';

export interface Skill {
  name: string;
  icon: IconType;
  description: string;
}

export const skills: Skill[] = [
  { name: 'HTML5', icon: SiHtml5, description: 'The standard markup language for structuring web pages.' },
  { name: 'Sass', icon: SiSass, description: 'A CSS preprocessor with variables, nesting, and mixins.' },
  { name: 'Vite', icon: SiVite, description: 'A fast build tool and dev server for modern web projects.' },
  { name: 'Figma', icon: SiFigma, description: 'A design tool for creating and prototyping interfaces.' },
  { name: 'React', icon: SiReact, description: 'A JavaScript library for building UIs out of components.' },
  { name: 'JavaScript', icon: SiJavascript, description: 'The core scripting language of the web.' },
  { name: 'TypeScript', icon: SiTypescript, description: 'JavaScript with static types, catches bugs before runtime.' },
  { name: 'Git', icon: SiGit, description: 'Version control for tracking changes in code.' },
  { name: 'GitHub', icon: SiGithub, description: 'Where the code lives, plus collaboration and CI.' },
  { name: 'Node.js', icon: SiNodedotjs, description: 'A JavaScript runtime for running code outside the browser.' },
];