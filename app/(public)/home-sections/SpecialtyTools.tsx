import Image from "next/image";

export default function SpecialtyTools() {
  const tools = [
    {
      name: "Alzheimer’s Risk Stratification",
      specialty: "Neurology",
      description: "Predict patient risk and identify high-value cohorts for research and early trials.",
      image: "/images/alzheimer.jpg",
    },
    {
      name: "Cardiac Risk Scoring & Cohort Analysis",
      specialty: "Cardiology",
      description: "Assess longitudinal heart health and stratify patient cohorts for research insights.",
      image: "/images/cardiology.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1B4D3E] mb-4">
            Specialty Research Tools
          </h2>
          <p className="text-lg text-[#1B4D3E] leading-relaxed max-w-3xl mx-auto">
            Advanced analytics for neurology and cardiology research — designed for clinical teams, CROs, and Pharma.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {tools.map((tool) => (
            <div key={tool.name} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center border border-gray-200">
              <div className="mb-4 w-full h-48 relative">
                <Image
                  src={tool.image}
                  alt={tool.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1B4D3E] mb-2">{tool.name}</h3>
              <p className="text-gray-700 mb-1">{tool.description}</p>
              <span className="text-sm text-gray-500">{tool.specialty}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
