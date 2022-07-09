// version
const VERSION = "v1.1.4"

// provider
const PROVIDER_OP = "https://opt-mainnet.g.alchemy.com/v2/MnmlgcGeD8FPWiy_0SHlubv1htTHIB1g";

// API
const API_OP_CONTRACT = 'https://api-optimistic.etherscan.io/api?module=contract&action=getabi&apikey=A7YUEGDPZD2DD2G784BNDKK1WZBBQP7D4X&address=';

// project info
const PROJ_BORED_TOWN = '1';
const PROJ_APETIMISM  = '3';
const PROJ_APETI_NOBG = '2';
const PROJ_BORED_SVVS = '4';
const PROJ_NERD_APE   = '5';
const PROJECT_INFO = {
  // Bored Town, Optimism
  // https://quixotic.io/collection/boredtown
  [PROJ_BORED_TOWN]: {
    provider: PROVIDER_OP,
    contract_addr: '0x8E56343adAFA62DaC9C9A8ac8c742851B0fb8b03',
  },
  // Apetimism
  // https://quixotic.io/collection/apetimism
  [PROJ_APETIMISM]: {
    //provider: PROVIDER_OP,
    //contract_addr: '0x51E5426eDE4e2d4c2586371372313B5782387222',
  },
  // Apetimism (No Background)
  // https://quixotic.io/collection/apetimism
  [PROJ_APETI_NOBG]: {
    //provider: PROVIDER_OP,
    //contract_addr: '0x51E5426eDE4e2d4c2586371372313B5782387222',
  },
  // Bored Survivors
  // https://quixotic.io/collection/boredsurvivors
  [PROJ_BORED_SVVS]: {
    //provider: PROVIDER_OP,
    //contract_addr: '0xf912C18f73AaEce880e2c683d4c412ea55327509',
  },
  // NerdApe
  // https://quixotic.io/collection/???
  [PROJ_NERD_APE]: {
    //provider: PROVIDER_OP,
    //contract_addr: '0x824BB1f0438A38Ea424e19171eF6665A4bCCe3A5',
  },
};
