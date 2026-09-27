import { createThreat } from '../models/threatModel.js';

export function analyzePacketForThreat(packet) {
  const threatProbability = 0.1;

  if (Math.random() >= threatProbability) {
    return null;
  }

  return createThreat(packet);
}
