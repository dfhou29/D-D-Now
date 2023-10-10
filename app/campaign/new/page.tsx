import CreateCampaignForm from "@/components/CreateCampaignForm";
import { getCookieData } from "@/helper/getCookieData";

export default function NewCampaign() {
  const userId = getCookieData().id;
  return (
      <div>
        <h1>Create a campaign</h1>
        <CreateCampaignForm userId={userId}/>
      </div>
  );
}
