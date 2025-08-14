import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#8080d7] text-[#010922] px-6 md:px-16 py-10 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
        Privacy Policy
      </h1>

     
     {/* Introduction Section */}
      <div className="space-y-4 text-justify leading-relaxed">
        <p className="text-lg md:text-xl font-medium">
          we take the privacy of the information you provide us very seriously.
          We created this privacy policy to demonstrate our commitment to
          privacy. Please read this carefully to understand how we use any
          information you provide us at __________.com
        </p>

        <p className="text-lg md:text-xl font-medium">
          __________ guarantees confidentiality of our members' identity,
          details and any suggestions made using those details as much possible
          under legal regulatory and security environment.
        </p>

        <p className="text-lg md:text-xl font-medium">
          __________ further guarantees that no direct or indirect use will be
          made by _______ about any information that is revealed in the case
          discussion for a member, except for the explicit purpose of
          communication made for that suggestion. We allow members to access
          their users profiles and change information, as they deem necessary.
        </p>

        <p className="text-lg md:text-xl font-medium">
          We do not sell or rent your personally identifiable information to
          anyone.
        </p>

        <p className="text-lg md:text-xl font-medium">
          As we keep adding new services and items, we suggest that you check
          back from time to time in order to understand how we treat your
          information. In case of change in our privacy policy, we will post
          those changes on this page so that you are always aware of what
          personal information we collect, how we use it and under what
          circumstances we disclose it. Your continued use of the site will
          constitute your acknowledgment of our Privacy Policy.
        </p>
      </div>

      {/* Index Section */}
      <h3 className="text-3xl font-bold mt-12 mb-6 text-center">
        The items below provide an index to the information that follows:
      </h3>

      <ol className="list-decimal space-y-8 pl-6 md:pl-12">
        {/* 1.personal information*/}
        <li className="text-2xl font-bold">What personal information we collect?</li>
        <ol className="list-[lower-alpha] pl-6 space-y-6">
          <li className="text-xl font-bold">Registration Data</li>
          <p className="text-lg font-medium">
            During membership registration, ________ collects personal
            information including your name, gender, birth information, email
            address, phone number and your place of birth and residence...
          </p>

          <li className="text-xl font-bold">Image</li>
          <p className="text-lg font-medium">
            Our app utilizes images exclusively for display purposes within the
            application, particularly as profile pictures...
          </p>

          <li className="text-xl font-bold">Log Files, IP Address and Cookies</li>
          <p className="text-lg font-medium">
            When you visit and interact with the services and tools that reside
            there, _____ and third parties...
          </p>

          <li className="text-xl font-bold">Through Order Forms</li>
          <p className="text-lg font-medium">
            We gather information that is required to fulfill our paid services
            though our order forms...
          </p>
        </ol>

        {/* 2. Security */}
        <li className="text-2xl font-bold">Security</li>
        <p className="text-lg font-medium">
          We DO NOT collect any payment information on our website...
        </p>

        {/* 3. How Users may request data deletion */}
        <li className="text-2xl font-bold">How Users may request data deletion?</li>
        <p className="text-lg font-medium">
          All personal information related to the User account will be deleted...
        </p>

        {/* 4. Other websites links */}
        <li className="text-2xl font-bold">Other web sites links</li>
        <p className="text-lg font-medium">
          Our web site may contain links to other web sites...
        </p>

        {/* 5. Contacting us */}
        <li className="text-2xl font-bold">Contacting us</li>
        <p className="text-lg font-medium">
          If you have any questions about this privacy statement...
        </p>
      </ol>
    </div>
  );
};

export default PrivacyPolicy;
