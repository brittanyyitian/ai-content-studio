import { getChatGPTUser } from "./chatgpt-auth";
import Workbench from "./workbench";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getChatGPTUser();
  return (
    <Workbench
      userName={user?.displayName ?? "内容负责人"}
      userEmail={user?.email ?? ""}
    />
  );
}
