import EditScenarioForm from "@/components/EditScenarioForm";

export default function EditScenario() {
  return (
    <div className="flex flex-col justify-center items-center w-4/5 bg-slate-100 ml-auto mr-auto">
      <h2 className="mb-16 text-md font-bold tracking-normal text-gray-600 text-4xl my-12">
        Edit Scenario
      </h2>

      <EditScenarioForm />
    </div>
  );
}
