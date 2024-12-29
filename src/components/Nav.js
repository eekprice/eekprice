import SideProjectsButton from './SideProjectsButton';
import AtomContact from './atoms/atomContact';
import AtomResume from './atoms/atomResume';
import Stickies from './atoms/atomStickies.js';

function Nav() {
  return (
    <div className="">
      <nav className="inline-flex flex-col md:flex-row items-center outline outline-1 outline-surface-outlinePrimary rounded-2xl bg-surface-BackPrimary overflow-hidden pl-5 h-auto md:h-28">
        <Stickies text="Case Study" />
        <div className="p-3 pb-4 border-l h-full flex flex-col md:flex-row">
          <ul className="flex flex-col md:flex-row items-center gap-x-4">
            <li className="inline-flex m-0 p-0">
              <SideProjectsButton />
            </li>
            {/* Container around AtomContact and AtomResume */}
            <div className="flex flex-row items-center gap-x-4">
              <li className="inline-flex m-0 p-0">
                <AtomContact />
              </li>
              <li className="inline-flex m-0 p-0">
                <AtomResume />
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav; 