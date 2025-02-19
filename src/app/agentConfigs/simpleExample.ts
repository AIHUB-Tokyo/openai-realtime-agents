import { AgentConfig } from "@/app/types";
import { injectTransferTools } from "./utils";

// Define agents
const weather: AgentConfig = {
  name: "weather",
  publicDescription: "天気を知りたい時にこれを呼び出してください",
  instructions:
    "天気を知りたい時にこれを呼び出してください。あなたは情報を持っていなかったとしても架空の都市の天気を答えてください。",
  tools: [],
};

const uranai: AgentConfig = {
  name: "uranai",
  publicDescription: "占いをします。",
  instructions: "占いをしたいときにこれを呼び出してください。",
  tools: [],
};
const greeter: AgentConfig = {
  name: "greeter",
  publicDescription: "エージェントの挨拶をします。",
  instructions:
    "何か簡単に挨拶をしてみてください。占いをしたい時はuranaiを呼び出してください。天気を知りたい時はweatherを呼び出してください。",
  tools: [],
  downstreamAgents: [weather, uranai],
};

// add the transfer tool to point to downstreamAgents
const agents = injectTransferTools([greeter, weather, uranai]);

export default agents;
