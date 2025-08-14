import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-[#aad9d9] text-[#010922] px-6 md:px-16 py-10 md:py-16 shadow-xl max-w-10xl text-justify">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-[#010922] drop-shadow-lg">Terms and Conditions</h1>

      <p className="mb-6 text-lg md:text-xl font-semibold">Effective Date: _________</p>

      <p className='mb-6 text-lg md:text-xl font-semibold leading-relaxed'>Welcome to <strong>[Website Name]</strong>. By using this platform, you agree to the following Terms and
         Conditions which govern your access to and use of our services, whether as a client, advocate, or visitor.
      </p>
      <ol className='list-decimal space-y-10 pl-6 md:pl-12'>
        <section>
          <li className="text-2xl font-bold mb-3">Platform Description</li>
          <p className='text-lg font-semibold leading-relaxed'>
            <strong>[Website Name]</strong> is an online platform that connects clients with legal professionals (advocates) across various countries and legal domains.
              Clients can discover and connect with advocates directly according to their legal needs through the platform’s search and contact features.
          </p>
        </section>

        <section>
          <li className="text-2xl font-bold mb-3"> Legal Relationship Disclaimer</li>
          <p className='text-lg font-semibold leading-relaxed'>
            We are not a law firm, and we do not offer legal advice. This platform acts solely as an intermediary to facilitate communication
             between clients and independently practicing legal professionals.
          </p>
           <p className='text-lg font-semibold leading-relaxed'>
            All engagements, consultations, advice, or representation are handled directly between the client and the advocate. We are not responsible 
            for the quality, outcome, or legal validity of services provided.
          </p>
        </section>

        <section>
          <li className="text-2xl font-bold mb-3">Eligibility</li>
          <ol className='list-[lower-alpha] space-y-4 pl-6'>
            <li className='text-lg font-bold'>To use this platform, users must:</li>
            <ul className='list-disc pl-6 space-y-2'>
              <li className='text-lg font-semibold'>Be at least 18 years of age, or the legal age of majority in their jurisdiction</li>
              <li className='text-lg font-semibold'>Provide accurate and truthful information</li>
              <li className='text-lg font-semibold'>Not impersonate any person or entity</li>
            </ul>
            <li className='text-lg font-bold'>Advocates must:</li>
            <ul className='list-disc pl-6 space-y-2'>
              <li className='text-lg font-semibold'>Be duly licensed, certified, or authorized to practice law in their respective jurisdictions</li>
              <li className='text-lg font-semibold'>Maintain updated credentials and profiles</li>
              <li className='text-lg font-semibold'>Not make false claims regarding specialization or legal qualifications</li>
            </ul>
          </ol>
        </section>
      
        <section>
          <li className="text-2xl font-bold mb-3">User Obligations</li>
          <ol className='list-[lower-alpha] space-y-4 pl-6'>
            <li className='text-lg font-bold'>For Clients:</li>
            <ul className='list-disc pl-6 space-y-2'>
              <li className='text-lg font-semibold'>Use the platform for genuine legal assistance</li>
              <li className='text-lg font-semibold'>Not misuse the messaging or contact features</li>
              <li className='text-lg font-semibold'>Respect advocate availability and time</li>
            </ul>
            <li className='text-lg font-bold'>For Advocates:</li>
            <ul className='list-disc pl-6 space-y-2'>
              <li className='text-lg font-semibold'>Ensure profile accuracy and regular updates</li>
              <li className='text-lg font-semibold'>Refrain from unethical advertising or false promises</li>
              <li className='text-lg font-semibold'>Comply with professional and legal codes of conduct</li>
            </ul>
          </ol>
        </section>

        <section>
          <li className="text-2xl font-bold mb-3">Account and Profile Responsibility</li>
          <p className='text-lg font-semibold leading-relaxed'>
            Users are responsible for maintaining the confidentiality of their account credentials. Any activity carried out through your account shall 
            be deemed to be yours. If you suspect unauthorized use, notify us immediately.
          </p>
        </section>  

        <section>
          <li className="text-2xl font-bold mb-3"> Fees and Payments</li>
          <p className='text-lg font-semibold leading-relaxed'>
            The platform itself does not charge clients for connecting with advocates. However, each advocate may have their own consultation fees, terms 
            of engagement, or payment modes, to be discussed directly with the client.
          </p>
          <p className='text-lg font-semibold leading-relaxed'>We are not responsible for payment disputes, non-delivery of services, or fee negotiations.</p>
        </section>   

        <section>
          <li className="text-2xl font-bold mb-3">No Endorsement</li>
          <p className='text-lg font-semibold leading-relaxed'>
            Listing of advocates does not imply our endorsement, certification, or guarantee of quality. Users are encouraged to conduct their own due diligence 
            before hiring any legal professional.
          </p>
        </section>     

        <section>
          <li className="text-2xl font-bold mb-3">Privacy</li>
          <p className='text-lg font-semibold leading-relaxed'>
            Your use of the platform is subject to our <strong>[Privacy Policy]</strong>, which outlines how your data is collected, stored, and used. Personal details shared for
             legal services are not accessed or stored by the platform beyond what is necessary.
          </p>
        </section>     

        <section>
          <li className="text-2xl font-bold mb-3">Prohibited Activities</li>
          <ol className='space-y-4 pl-6'>
            <li className='text-lg font-bold'>Users agree not to:</li>
            <ul className='list-disc pl-6 space-y-2'>
              <li className='text-lg font-semibold'>Misrepresent identity or legal issues</li>
              <li className='text-lg font-semibold'>Attempt to scrape data or use bots</li>
              <li className='text-lg font-semibold'>Infringe upon any advocate’s or user’s rights</li>
              <li className='text-lg font-semibold'>Use the platform for fraudulent, violent, defamatory, or unlawful activities</li>
            </ul>
          </ol>
        </section>

        <section>
          <li className="text-2xl font-bold mb-3">Intellectual Property</li>
          <p className='text-lg fontext-lg font-semibold leading-relaxed'>
            All content on this website (designs, text, graphics, logos, software, etc.) is owned or licensed by <strong>[Your Website Name]</strong>. You may not copy, reproduce, 
            or use content without written permission.
          </p>
        </section>  

        <section>
          <li className="text-2xl font-bold mb-3">Limitation of Liability</li>
          <ol className='space-y-4 pl-6'>
            <li className='text-lg font-bold'>To the fullest extent permitted by law, <strong>[Your Website Name]</strong>, its owners, affiliates, and partners shall not be liable for:</li>
            <ul className='list-disc pl-6 space-y-2'>
              <li className='text-lg font-semibold'>Any indirect or consequential loss</li>
              <li className='text-lg font-semibold'>Advocate-client disputes</li>
              <li className='text-lg font-semibold'>Any errors or omissions in advocate profiles</li>
              <li className='text-lg font-semibold'>Delays or interruptions in service</li>
            </ul>
          </ol>
        </section>       

        <section>
          <li className="text-2xl font-bold mb-3">Termination</li>
          <ol className='space-y-4 pl-6'>
            <li className='text-lg font-bold'>We reserve the right to suspend or terminate access to any user, with or without notice, in case of:</li>
            <ul className='list-disc pl-6 space-y-2'>
              <li className='text-lg font-semibold'>Violation of these terms</li>
              <li className='text-lg font-semibold'>Suspicion of fraudulent behavior</li>
              <li className='text-lg font-semibold'>Legal or regulatory request</li>
            </ul>
          </ol>
        </section>   

         <section>
          <li className="text-2xl font-bold mb-3">Modification of Terms</li>
          <p className='text-lg font-semibold leading-relaxed'>
            We may update these Terms at any time without prior notice. The updated version will be posted on this page with the revised date. 
            Continued use of the platform implies acceptance of those changes.
          </p>
        </section>  

         <section>
          <li className="text-2xl font-bold mb-3">Governing Law and Jurisdiction</li>
          <p className='text-lg font-semibold leading-relaxed'>
           These Terms shall be governed by the laws of the country from where the said dispute belongs.
          </p>
        </section>   

        <section>
          <li className="text-2xl font-bold mb-3">Contact Information</li>
           <ol className='space-y-4 pl-6'>
            <li className='text-lg font-bold'>For any questions regarding these Terms and Conditions, please contact:</li>
            <ul className='list-disc pl-6 space-y-2'>
              <li className='text-lg font-bold'>[Website name]</li>
              <li className='text-lg font-semibold'>Email:</li>
              <li className='text-lg font-semibold'>Phone:</li>
              <li className='text-lg font-semibold'>Address:</li>
            </ul>
          </ol>
        </section>      
      </ol>
    </div>
  );
};

export default TermsAndConditions;
