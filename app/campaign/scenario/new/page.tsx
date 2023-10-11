import CreateScenarioForm from "@/components/CreateScenarioForm";

export default function NewScenario({
  searchParams,
}: {
  searchParams: { campaignId: number };
}) {
  const id = searchParams.campaignId;
  return <CreateScenarioForm id={id} />;
}
