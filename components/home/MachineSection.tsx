import machines from "@/data/machine models.json";

export default function MachineSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl font-bold mb-8">Machine Models</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {machines.map((machine: any, index: number) => (
            <div key={`${machine["Model Name"]}-${index}`} className="p-4 border rounded">
              <h3 className="font-bold">{machine["Model Name"]}</h3>
              <p>{machine["Brand"]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
