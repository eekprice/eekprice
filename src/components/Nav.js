import SideProjectsButton from './SideProjectsButton';
import AtomContact from './atoms/atomContact';
import AtomResume from './atoms/atomResume';
import Stickies from './atoms/atomStickies.js';

function Nav() {
  return (
    // Container for the navigation bar, similar to a Frame in Figma
    <div className="">
      {/* Navigation bar styled as a horizontal Auto Layout */}
      <nav className="bg-surface-background100-light dark:bg-surface-background100-dark
       text-surface-foreground100-light dark:text-surface-foreground100-dark 
       border border-1 border-surface-outline-light dark:border-surface-outline-dark 
       inline-flex flex-col md:flex-row items-center rounded-2xl overflow-hidden pl-5 h-auto md:h-28 ">
        
        {/* Sticky note element*/}
        <Stickies text="Case Study" />
        
        {/* Container for navigation items, similar to a nested Frame */}
        <div className="p-3 pb-4 border-l border border-1 border-surface-outline-light dark:border-surface-outline-dark h-full flex flex-col md:flex-row">
          
          {/* List of navigation items, like a horizontal Auto Layout with spacing */}
          <ul className="flex flex-col md:flex-row items-center gap-x-4">
            
            {/* Individual navigation item, similar to a component instance */}
            <li className="inline-flex m-0 p-0">
              <SideProjectsButton />
            </li>
            
            {/* Group of contact and resume items, akin to a nested Auto Layout */}
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