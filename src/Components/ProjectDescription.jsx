import React from 'react';

const ProjectDescription = () => {
  const features = [
    {
      title: "Smart Prioritization",
      desc: "Categorize tasks into Low, Medium, and High priority with real-time color coding.",
      icon: "⚡"
    },
    {
      title: "Soft Delete & Recovery",
      desc: "Mistakes happen. Move tasks to the Trash and restore them whenever you need.",
      icon: "♻️"
    },
    {
      title: "Seamless Workflow",
      desc: "Track status from 'Pending' to 'Completed' with a single click.",
      icon: "✅"
    },
    {
      title: "Deadline Tracking",
      desc: "Never miss a milestone with integrated due date management.",
      icon: "📅"
    }
  ];

  return (
    <div className="bg-[#0f172a] text-white py-12 px-6 max-w-6xl mx-auto transition-all">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 to-[#fab12a] bg-clip-text text-transparent">
          Master Your Workflow with NexusTask
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A high-performance task management ecosystem  
          designed for developers who value speed, structure, and clean UI.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-[#1e293b] border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all group shadow-xl">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action for Guests */}
      <div className="mt-16 p-8 bg-blue-600/10 border border-blue-500/20 rounded-3xl text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
        <p className="text-slate-400 mb-6 italic">Securely managed via Laravel Sanctum authentication.</p>
        <div className="flex justify-center gap-4">
          
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;