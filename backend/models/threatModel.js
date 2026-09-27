const threatTypes = ['Port Scan', 'DDoS Attack', 'Suspicious Traffic', 'Malware', 'Brute Force'];
const severities = ['low', 'medium', 'high', 'critical'];

const threatDescriptions = {
  'Port Scan': ['Multiple connection attempts detected', 'Sequential port scanning detected'],
  'DDoS Attack': ['Unusual traffic volume from single source', 'Flood attack pattern detected'],
  'Suspicious Traffic': ['Unknown protocol detected', 'Anomalous packet size'],
  Malware: ['Malicious payload signature match', 'C&C server communication detected'],
  'Brute Force': ['Multiple failed authentication attempts', 'Password attack detected'],
};

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function createThreat(packet) {
  const type = pick(threatTypes);

  return {
    id: Date.now() + Math.random(),
    timestamp: new Date().toLocaleTimeString(),
    type,
    severity: pick(severities),
    source: packet.source,
    description: pick(threatDescriptions[type]),
  };
}
