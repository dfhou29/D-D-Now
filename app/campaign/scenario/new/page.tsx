import CreateScenarioForm from "@/components/CreateScenarioForm";

export default function NewScenario({ searchParams } : { searchParams: { campaignId: number } }) {
  const id = searchParams.campaignId;
  return (
      <div>
        <h1>Create a scenario</h1>
        <CreateScenarioForm id={id}/>
      </div>
  );
}
