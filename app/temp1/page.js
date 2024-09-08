import React from 'react';

const Resume = () => {
  return (
    <div className="max-w-[793px] mx-auto p-8 border border-gray-300" style={{ height: '1122px' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Your Name</h1>
        <p className="text-lg">your.email@example.com | +1234567890 | LinkedIn Profile</p>
      </header>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
        <div className="pl-4">
          <h3 className="text-xl font-semibold">Your Degree</h3>
          <p className="text-sm">University Name, Graduation Year</p>
          <p className="text-sm">Relevant coursework or achievements</p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <div className="pl-4">
          <ul className="list-disc list-inside">
            <li>Skill 1</li>
            <li>Skill 2</li>
            <li>Skill 3</li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Experience</h2>
        <div className="pl-4">
          <h3 className="text-xl font-semibold">Job Title</h3>
          <p className="text-sm">Company Name, Duration</p>
          <p className="text-sm">Key responsibilities and achievements</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <div className="pl-4">
          <h3 className="text-xl font-semibold">Project Name</h3>
          <p className="text-sm">Brief description of the project</p>
        </div>
      </section>

      {/* Awards & Certificates */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Awards & Certificates</h2>
        <div className="pl-4">
          <ul className="list-disc list-inside">
            <li>Award/Certificate 1</li>
            <li>Award/Certificate 2</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Resume;
