// version
const VERSION = "v1.0.4"

// provider
const PROVIDER_OP = "https://opt-mainnet.g.alchemy.com/v2/MnmlgcGeD8FPWiy_0SHlubv1htTHIB1g";

// API
const API_OP_CONTRACT = 'https://api-optimistic.etherscan.io/api?module=contract&action=getabi&apikey=A7YUEGDPZD2DD2G784BNDKK1WZBBQP7D4X&address=';

// project info
const PROJECT_INFO = {
  // Bored Town, optimism
  '1': {
    provider: PROVIDER_OP,
    contract_addr: '0x8E56343adAFA62DaC9C9A8ac8c742851B0fb8b03',
  },
  // Apetimism, optimism
  '2': {
    provider: PROVIDER_OP,
    contract_addr: '0x51E5426eDE4e2d4c2586371372313B5782387222',
  },
};
