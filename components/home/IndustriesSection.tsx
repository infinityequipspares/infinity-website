export default function IndustriesSection() {
  const industries = [
    "Boom Lifts",
    "Scissor Lifts",
    "Telehandlers",
    "Vertical Lifts",
    "Spider Lifts",
    "Truck Mounted Platforms",
    "Material Handling Equipment",
    "Cranes",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-red-600 uppercase tracking-[4px] font-semibold">
            Industries We Serve
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Equipment We Support
          </h2>

          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Infinity Equipments And Spares supplies genuine and aftermarket spare
            parts for a wide range of aerial work platforms and material
            handling equipment across India.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {industries.map((item, index) => (

            <div
              key={`${item}-${index}`}
              className="bg-white border rounded-2xl p-8 text-center hover:border-red-600 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold text-lg">
                {item}
              </h3>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
