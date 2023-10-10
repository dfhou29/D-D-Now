import CreateSettingForm from "@/components/CreateSettingForm";

export default function NewSetting({ searchParams } : { searchParams: { campaignId: number } }) {
  const id = searchParams.campaignId;
  return (
      <div>
        <h1>Create a setting</h1>
        <CreateSettingForm id={id}/>
      </div>
  );
}
