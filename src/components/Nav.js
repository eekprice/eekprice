import SideProjectsButton from './SideProjectsButton';
import AtomContact from './atoms/atomContact';
import AtomResume from './atoms/atomResume';

function Nav() {
  return (
    <nav className="flex flex-col space-y-2 outline outline-2 outline-text-primary rounded-lg p-4">
      <ul className="flex flex-row items-center space-x-6">
        <li className="text-lg font-merriweather font-light text-text-primary hover:text-primary-outline cursor-pointer">
          Work
        </li>
        <li className="text-lg font-merriweather font-light text-text-primary hover:text-primary-outline cursor-pointer">
          About
        </li>
        <li>
          <AtomContact />
        </li>
        <li>
          <AtomResume />
        </li>
        <li>
          <SideProjectsButton />
        </li>
      </ul>
    </nav>
  );
}

export default Nav; 