import { AgentConfig, Tool } from "@/app/types";

/**
 * This defines and adds "transferAgents" tool dynamically based on the specified downstreamAgents on each agent.
 */
export function injectTransferTools(agentDefs: AgentConfig[]): AgentConfig[] {
  // Iterate over each agent definition
  agentDefs.forEach((agentDef) => {
    const downstreamAgents = agentDef.downstreamAgents || [];

    // Only proceed if there are downstream agents
    if (downstreamAgents.length > 0) {
      // Build a list of downstream agents and their descriptions for the prompt
      const availableAgentsList = downstreamAgents
        .map(
          (dAgent) =>
            `- ${dAgent.name}: ${dAgent.publicDescription ?? "No description"}`
        )
        .join("\n");
      console.log(availableAgentsList);

      // Create the transfer_agent tool specific to this agent
      const transferAgentTool: Tool = {
        type: "function",
        name: "transferAgents",
        description: `より専門的なエージェントへのユーザーの転送を開始します。
  より専門的なLLMエージェントまたは人間のエージェントに、追加のコンテキストと共にエスカレーションします。
  利用可能なエージェントの中から適切なものがある場合のみ、この機能を呼び出してください。自分自身のエージェントタイプには転送しないでください。
  
  転送する前に、ユーザーに転送することを知らせてください。
  
  利用可能なエージェント:
  ${availableAgentsList}
        `,
        parameters: {
          type: "object",
          properties: {
            rationale_for_transfer: {
              type: "string",
              description: "この転送が必要な理由を説明してください。",
            },
            conversation_context: {
              type: "string",
              description:
                "受信者が適切なアクションを実行するのに役立つ会話の関連コンテキスト。",
            },
            destination_agent: {
              type: "string",
              description:
                "ユーザーの要求を処理するべき、より専門的な転送先エージェント。",
              enum: downstreamAgents.map((dAgent) => dAgent.name),
            },
          },
          required: [
            "rationale_for_transfer",
            "conversation_context",
            "destination_agent",
          ],
        },
      };

      // Ensure the agent has a tools array
      if (!agentDef.tools) {
        agentDef.tools = [];
      }

      // Add the newly created tool to the current agent's tools
      agentDef.tools.push(transferAgentTool);
    }

    // so .stringify doesn't break with circular dependencies
    agentDef.downstreamAgents = agentDef.downstreamAgents?.map(
      ({ name, publicDescription }) => ({
        name,
        publicDescription,
      })
    );
  });

  return agentDefs;
}
