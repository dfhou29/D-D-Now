import CreateSettingForm from "@/components/CreateSettingForm";

export default function NewSetting({
  searchParams,
}: {
  searchParams: { campaignId: number };
}) {
  const id = searchParams.campaignId;
  return (
    <div>
      <CreateSettingForm id={id} />
    </div>
  );
}
