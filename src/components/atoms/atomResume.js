import NavItem from './NavItem';

const ResumeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

// Goes to the Resume page (pages/ResumePage.js). It used to open
// /resume.pdf, a file that was never added.
function AtomResume({ onClick, active = false }) {
  return <NavItem icon={ResumeIcon} label="Resume" onClick={onClick} active={active} />;
}

export default AtomResume;
