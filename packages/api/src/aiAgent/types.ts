export type AiAgentType = "task" | "description";

export type AgentPayload = {
  type: AiAgentType;
  input: string;
};

export type AgentResult = Record<string, any>;
