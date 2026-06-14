/** Base URL of the agent-team Flask server (logger_daemon). Override with
 *  VITE_AGENT_BASE if it runs elsewhere. */
export function agentBase(): string {
  const env = (import.meta.env.VITE_AGENT_BASE as string | undefined)?.trim();
  return env || 'http://localhost:8765';
}
