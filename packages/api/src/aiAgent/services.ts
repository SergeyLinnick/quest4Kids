import { Session } from "@repo/auth";
import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import { AgentPayload, AgentResult } from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const aiAgentService = {
  generate: ({
    type,
    input,
    session,
  }: AgentPayload & { session?: Session }): Promise<AgentResult> => {
    // let path: string;
    // switch (type) {
    //   case "task":
    //     path = API_PATH.AI_AGENT.GENERATE_TASK;
    //     break;
    //   default:
    //     path = API_PATH.AI_AGENT.GENERATE_DESCRIPTION;
    // }

    const url = `${api}${API_PATH.AI_AGENT.GENERATE_TASK}`;

    console.log("url", url);

    const options = {
      method: "POST",
      url,
      body: JSON.stringify({ prompt: input }),
      sessionClient: session ?? null,
    };

    return authHttpClient.fetch(options);
  },
};
