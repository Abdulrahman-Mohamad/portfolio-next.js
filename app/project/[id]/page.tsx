import React from 'react';

const ProjectDetails = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Project Details: {params.id}</h1>
      <p>Content for project details will go here.</p>
    </div>
  );
};

export default ProjectDetails;
