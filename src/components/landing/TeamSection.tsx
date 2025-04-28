
import React from 'react';

type TeamMemberProps = {
  name: string;
  role: string;
  image: string;
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4 text-center">
        <h4 className="font-heading font-semibold text-lg">{name}</h4>
        <p className="text-neutral-600 text-sm">{role}</p>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Sai Siddeshwar",
      role: "Team Lead",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Sowmya",
      role: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Pranay",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Srikar",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Asvitha",
      role: "QA Engineer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Sai Venkat",
      role: "DevOps Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ];

  return (
    <section id="team" className="section-padding bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
          <p className="text-neutral-600">
            The talented individuals behind JobFlowVerse, working to connect students with opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-neutral-500">
            CMRCET - ECE 2027 Batch
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
