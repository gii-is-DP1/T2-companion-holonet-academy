import ModulesLesson from './01-modules/index.jsx';
import ComponentsLesson from './02-components/index.jsx';
import PropsLesson from './03-props/index.jsx';
import StateLesson from './04-state/index.jsx';
import LocalStateLesson from './05-state-is-local/index.jsx';
import LiftingStateLesson from './06-lifting-state-up/index.jsx';
import ContextLesson from './07-context/index.jsx';
import FetchingLesson from './08-fetching/index.jsx';

/**
 * A single list of lessons, used both by the navigation menu and by the
 * router. Adding a lesson means adding one entry here — the menu and the
 * routes follow automatically. (Small example of "don't repeat yourself".)
 */
export const LESSONS = [
  { slug: 'modules', title: 'Modules', slides: '23', Component: ModulesLesson },
  { slug: 'components', title: 'Components', slides: '24-30', Component: ComponentsLesson },
  { slug: 'props', title: 'Props', slides: '36, 48', Component: PropsLesson },
  { slug: 'state', title: 'State & hooks', slides: '36-41', Component: StateLesson },
  { slug: 'local-state', title: 'State is local', slides: '42-43, 46', Component: LocalStateLesson },
  { slug: 'lifting-state', title: 'Lifting state up', slides: '44-47', Component: LiftingStateLesson },
  { slug: 'context', title: 'Context', slides: '48-49', Component: ContextLesson },
  { slug: 'fetching', title: 'Fetching data', slides: '55-57, 75', Component: FetchingLesson },
];
