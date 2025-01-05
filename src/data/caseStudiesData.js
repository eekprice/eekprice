import { ReactComponent as HeartSvg } from '../assets/Heart.svg';
import employeeImg from '../assets/StudyPOS/employee.png';
import kfceImg from '../assets/StudyPOS/KFC.svg';
import kfceOldPos from '../assets/StudyPOS/oldKFCPOS.gif';
import ControlledGif from '../components/atoms/ControlledGif';
import { ReactComponent as ReactionOhNo } from '../assets/OhDear.svg';
import { ReactComponent as KfcWires } from '../assets/StudyPOS/wiresKfc.svg';

export const caseStudies = [
  {
    title: "Conversational ordering in the POS",
    slides: [
      {
        content: (
          <div className="flex flex-col justify-between h-full p-4
           bg-surface-background200-light dark:bg-surface-background200-dark
           text-surface-foreground100-light dark:text-surface-foreground100-dark
           border-2 border-surface-border100-light dark:border-surface-border100-dark
           rounded-lg">
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex flex-row justify-between items-end">
                <h3 className="text-xl font-bold">Problem</h3>
                <div className="w-16">
                  <img 
                    src={employeeImg}
                    alt="KFC Drive Thru Employee" 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
              </div>
            
              <p className="text-sm text-left border-l-4 border-surface-border100-light dark:border-surface-border100-dark pl-4 italic">
                "My biggest complaint is how rigid my team members have to be in the drive thru. Ordering is a conversation and the POS isn't flexible to accommodate them "
              </p>
              <p className="text-sm text-left">Angela - KFC Manager</p>
            </div>
          </div>
        ),
        width: 'w-64'
      },
      {
        content: (
          <div className="relative w-full h-full">
            <div className="h-full w-full">
              <ControlledGif 
                src={kfceOldPos}
                alt="Legacy POS in the drive through" 
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-16 rounded-lg
             bg-surface-background200-light dark:bg-surface-background200-dark 
             border-2 border-surface-border100-light dark:border-surface-border100-dark">
              <ReactionOhNo className="w-full h-auto text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
            </div>
          </div>
        ),
        width: 'w-[400px]'
      },
      
      {
        content: (
          <div className="relative w-full h-full">
            <div className="h-full w-full">
              <KfcWires 
                className="w-full h-full rounded-lg"
              />
            </div>
            
          </div>
        ),
        width: 'w-[400px]'
      },
      {
        content: (
          <div className="flex items-end justify-center h-full w-full">
            <img 
              src={kfceImg}
              alt="KFC Drive Thru Employee" 
              className="max-w-full h-auto object-contain"
            />
          </div>
        ),
        width: 'w-[400px]'
      },
      {
        content: (
          <div className="flex flex-col justify-between h-full p-4
           bg-surface-background200-light dark:bg-surface-background200-dark
           text-surface-foreground100-light dark:text-surface-foreground100-dark
           border-2 border-surface-border100-light dark:border-surface-border100-dark
           rounded-lg">
            <h3 className="text-xl font-bold mb-6">Research</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">35+</span>
                <span className="text-sm text-center">Studies conducted</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">200+</span>
                <span className="text-sm text-center"># of Participants</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">4</span>
                <span className="text-sm text-center">States Visited</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">9</span>
                <span className="text-sm text-center">Stores Visits</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">60+</span>
                <span className="text-sm text-center">Hours in Store</span>
              </div>
            </div>
          </div>
        ),
        width: 'w-[800px]'
      },
      { content: "Slide 2 Content", backgroundColor: "#f1c40f" },
      { content: "Slide 2 Content", backgroundColor: "#f1c40f" },
      { content: "Slide 2 Content", backgroundColor: "#f1c40f" },
    ],
    link: "https://example.com/case-study-1"
  },
  {
    title: "Simplifying Menu Schemas",
    slides: [
      { content: "Slide 1 Content", backgroundColor: "#2ecc71" },
      { content: "Slide 2 Content", backgroundColor: "#f1c40f" },
    ],
    link: "https://example.com/case-study-2"
  },
  // Add more case studies as needed
]; 