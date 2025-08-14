import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdOutlineSecurity} from "react-icons/md";
import { FaUserTie, FaUsers} from 'react-icons/fa';
/* Styled MUI Components */
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

/*Main Component*/
const FAQs = () => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (_event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="bg-[#8080d7] text-[#010922] px-6 md:px-16 py-10 md:py-16 shadow-xl text-justify">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-[#010922] drop-shadow-lg">FAQs</h1>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ backgroundColor: '#aad9d9', color: '#010922' }}>
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          <Typography component="span"><b>What is AdvocateHub?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            AdvocateHub is a legal tech platform that connects clients with verified lawyers across India for 1:1 consultations via chat or video call.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel2-content" id="panel2-header">
          <Typography component="span"><b>How does AdvocateHub work?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Clients can search for lawyers by location, court level, and case type, then book a session via chat or video after selecting a suitable time slot and paying the consultation fee.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel3-content" id="panel3-header">
          <Typography component="span"><b>Is AdvocateHub available across India?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Yes, we connect clients with lawyers from all jurisdictions including District, State, and Supreme Court levels.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/*For clients */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-[#010922] text-center"><FaUsers className='inline-block mr-2'/>For Clients</h2>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel4-content" id="panel4-header">
          <Typography component="span"><b>How do I book a lawyer on AdvocateHub?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Sign up, search using filters (location, case type, court level), view lawyer profiles, choose a time, and book a session via chat or video.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel5-content" id="panel5-header">
          <Typography component="span"><b>Can I choose a lawyer based on my legal issue?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Yes, you can filter lawyers based on the case type: Family, Property, Criminal, Civil, Corporate/IP, etc.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel6-content" id="panel6-header">
          <Typography component="span"><b>What is the mode of consultation?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            You can choose between a real-time chat or video call session with the lawyer.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel7-content" id="panel7-header">
          <Typography component="span"><b>How much does a consultation cost?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Consultation fees are set by individual lawyers and are visible on their profile.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel8-content" id="panel8-header">
          <Typography component="span"><b>Is my session recorded?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Sessions are recorded only if both client and lawyer conse9t.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel9-content" id="panel9-header">
          <Typography component="span"><b>What if I miss a scheduled session?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Missed sessions are marked as "cancelled". Check the cancellation policy on the booking page.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel10-content" id="panel10-header">
          <Typography component="span"><b>Can I reschedule my session?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Yes, sessions can be rescheduled based on lawyer availability, before the session time.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel11-content" id="panel11-header">
          <Typography component="span"><b>How do I pay for a session?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Payments are made securely through Razorpay, Stripe, or Cashfree before the session begins.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel12-content" id="panel12-header">
          <Typography component="span"><b>Will I get an invoice after payment?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Yes, a digital invoice is generated and available in your dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel13'} onChange={handleChange('panel13')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel13-content" id="panel13-header">
          <Typography component="span"><b>How do I leave feedback about a lawyer?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            After your session, you can rate and review the lawyer i14 your session history.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/*For lawyers */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-[#010922] text-center">< FaUserTie className='inline-block mr-2' />For Lawyers</h2>

      <Accordion expanded={expanded === 'panel14'} onChange={handleChange('panel14')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel14-content" id="panel14-header">
          <Typography component="span"><b>How can I join AdvocateHub as a lawyer?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Register with your Bar Council ID, PAN, and Aadhaar. Once verified by our team, your profile will go live.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel15'} onChange={handleChange('panel15')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel15-content" id="panel15-header">
          <Typography component="span"><b>What documents are required for verification?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Bar Council ID, Aadhaar, and PAN are required for identity and professional verification.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel16'} onChange={handleChange('panel16')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel16-content" id="panel16-header">
          <Typography component="span"><b>Can I choose my consultation fees?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Yes, lawyers can set their own fees per session or per minute.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel17'} onChange={handleChange('panel17')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel17-content" id="panel17-header">
          <Typography component="span"><b>How do I manage my availability?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Lawyers can update available time slots from their dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel18'} onChange={handleChange('panel18')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel18-content" id="panel18-header">
          <Typography component="span"><b>Can I consult in multiple legal domains?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Yes, multiple case types (e.g., Family, Criminal, Corporate) can be selected during profile setup.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel19'} onChange={handleChange('panel19')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel19-content" id="panel19-header">
          <Typography component="span"><b>How do I get paid?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Payments are settled after each session with platform commission deducted.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel20'} onChange={handleChange('panel20')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel20-content" id="panel20-header">
          <Typography component="span"><b>Is my profile instantly visible after registration?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            No, your profile will be visible only after verification and approval by the admin.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Security & Legal Section */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-[#010922] text-center"><MdOutlineSecurity className="inline-block mr-2" />Security & Legal</h2>

      <Accordion expanded={expanded === 'panel21'} onChange={handleChange('panel21')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel21-content" id="panel21-header">
          <Typography component="span"><b>Is my personal information secure?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Yes, we use password hashing (bcrypt), secure JWT tokens, HTTPS encryption, and secure file uploads.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel22'} onChange={handleChange('panel22')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel22-content" id="panel22-header">
          <Typography component="span"><b>Is AdvocateHub liable for the legal advice given by lawyers?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            No, AdvocateHub serves as a platform to connect clients with lawyers. All advice is solely the responsibility of the respective lawyer.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel23'} onChange={handleChange('panel23')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel23-content" id="panel23-header">
          <Typography component="span"><b>How is data privacy maintained?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            We follow GDPR and Indian IT Act standards to ensure data protection.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel24'} onChange={handleChange('panel24')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel24-content" id="panel24-header">
          <Typography component="span"><b>Is there customer support available?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Yes, you can raise a support ticket from your dashboard for technical or session-related issues.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel25'} onChange={handleChange('panel25')} sx={{ backgroundColor: '#aad9d9', color: '#0a0a0a' }}>
        <AccordionSummary aria-controls="panel25-content" id="panel25-header">
          <Typography component="span"><b>Can sessions be recorded?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: 550, color: '#1f2937' }}>
            Recording is optional and can only happen with mutual consent between the client and the lawyer.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQs;
