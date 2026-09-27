const protocols = ['TCP', 'UDP', 'ICMP'];
const commonPorts = [80, 443, 22, 21, 25, 53, 3306, 5432, 8080, 3000, 5000];

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomHost(prefix) {
  return `${prefix}.${Math.floor(Math.random() * 254) + 1}`;
}

export function createPacket() {
  const protocol = pick(protocols);
  const port = pick(commonPorts);

  return {
    id: Date.now() + Math.random(),
    timestamp: new Date().toLocaleTimeString(),
    source: randomHost('192.168.1'),
    destination: randomHost('10.0.0'),
    protocol,
    port,
    size: Math.floor(Math.random() * 1500) + 64,
    info: protocol === 'TCP' ? 'ACK' : protocol === 'UDP' ? 'DNS Query' : 'Echo Request',
  };
}
