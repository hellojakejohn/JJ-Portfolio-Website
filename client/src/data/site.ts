// Single source of truth for the site's content.
// Later: projects can be fed from the Jake OS registry (meta/projects).

export type Status = 'building' | 'live' | 'testnet'

export interface Project {
  slug: string
  name: string
  status: Status
  statusLabel: string
  role: string
  when: string
  oneLiner: string
  image: string
  parts: { label: string; value: string }[]
  live?: { label: string; href: string }
  repo?: string
  about: string[]
  built: string[]
  featured?: boolean
}

export const socials = [
  { id: 'x', label: 'X', handle: '@hellojakejohn', href: 'https://x.com/hellojakejohn' },
  { id: 'youtube', label: 'YouTube', handle: '@hellojakejohn', href: 'https://www.youtube.com/@hellojakejohn' },
  { id: 'linkedin', label: 'LinkedIn', handle: '/in/hellojakejohn', href: 'https://www.linkedin.com/in/hellojakejohn/' },
  { id: 'github', label: 'GitHub', handle: 'hellojakejohn', href: 'https://github.com/hellojakejohn' },
] as const

export const email = 'hellojakejohn@gmail.com'

// 200-day X challenge: 2 posts a day, Sep 24 2026 to Apr 11 2027.
export const xChallenge = { start: '2026-09-24', days: 200 }

export const projects: Project[] = [
  {
    slug: 'tripquest',
    name: 'TripQuest',
    status: 'building',
    statusLabel: 'Founding engineer',
    role: 'Founding engineer',
    when: 'Mar 2026 to now',
    oneLiner: 'AI-generated travel quests with Solana rewards.',
    image: '/img/tripquest.jpg',
    parts: [
      { label: 'mobile', value: 'React Native + Expo' },
      { label: 'onchain', value: 'Solana + Anchor (Rust)' },
      { label: 'backend', value: 'Supabase: Auth, Postgres, Edge Functions' },
      { label: 'voice ai', value: 'ElevenLabs Conversational AI' },
    ],
    about: [
      'TripQuest generates travel quests with AI and rewards the people who finish them on Solana.',
      'I joined as the founding engineer in March 2026 and have built the app from the first commit: a pnpm monorepo holding the mobile app, the Anchor program and the Supabase backend.',
    ],
    built: [
      'Mobile app in React Native + Expo',
      'Solana program in Rust with Anchor for quest rewards',
      'Supabase backend: auth, Postgres schema, edge functions',
      'Voice features on ElevenLabs Conversational AI',
    ],
    featured: true,
  },
  {
    slug: 'dustsweep',
    name: 'DustSweep',
    status: 'live',
    statusLabel: 'Live · Robinhood Chain',
    role: 'Solo build',
    when: '2026',
    oneLiner: 'Sell every dead token in your wallet. One signature.',
    image: '/img/dustsweep.jpg',
    parts: [
      { label: 'contracts', value: 'Solidity · Foundry' },
      { label: 'signing', value: 'Permit2 batch (EIP-712)' },
      { label: 'routing', value: 'Uniswap V3' },
      { label: 'app', value: 'Vite · React · wagmi · viem' },
    ],
    live: { label: 'dustsweep.xyz', href: 'https://dustsweep.xyz' },
    repo: 'https://github.com/hellojakejohn/dustsweep.xyz',
    about: [
      'Two launchpads shipped roughly 63,000 tokens onto Robinhood Chain and then turned off their front ends. The liquidity is still there. The way out is not.',
      'DustSweep finds the dead tokens in your wallet, prices each one against a live Uniswap V3 pool, and sells the ones worth selling for ETH in one Permit2 batch signature. Non-custodial, source public, unaudited, and it says so.',
    ],
    built: [
      'Sweeper contract: batch entry point that holds no balance and moves only what the signature covers',
      'V3 adapter routing each token to WETH through SwapRouter02',
      'Foundry tests forked against mainnet, buying their own dust inside the fork',
      'Front end that sorts a wallet into four piles: worth sweeping, not worth the gas, no route out, not dust',
    ],
  },
  {
    slug: 'welp',
    name: 'Welp',
    status: 'testnet',
    statusLabel: 'Sepolia · Solidity capstone',
    role: 'Metana Solidity capstone',
    when: '2026',
    oneLiner: 'Onchain reviews for Saint Paul businesses that pay you in WELP.',
    image: '/img/welp.jpg',
    parts: [
      { label: 'contracts', value: 'Solidity 0.8.20 · Foundry · OpenZeppelin v5' },
      { label: 'app', value: 'Next.js · TypeScript · Tailwind' },
      { label: 'wallet', value: 'wagmi · viem · WalletConnect' },
      { label: 'storage', value: 'IPFS via Pinata' },
    ],
    live: { label: 'welp.hellojakejohn.com', href: 'https://welp.hellojakejohn.com' },
    repo: 'https://github.com/hellojakejohn/welp',
    about: [
      'Check in at a local business, write a review, earn WELP. Reviews live on IPFS so they cannot be quietly deleted, and reputation comes from community votes, so spamming reviews does not raise your reward tier.',
    ],
    built: [
      'ReviewRegistry: businesses, check-ins, reviews, one vote per address, 24h check-in window',
      'RewardsVault: tier-based rewards (Bronze, Silver, Gold) read from on-chain reputation',
      'WelpToken: ERC-20, mint restricted to the vault, pausable',
      'Wallet-gated Next.js front end with review content pinned to IPFS',
    ],
  },
  {
    slug: 'rework',
    name: 'ReWork',
    status: 'live',
    statusLabel: 'Live · Full-stack capstone',
    role: 'Metana Full-Stack capstone',
    when: '2025',
    oneLiner: 'AI resume optimizer. Upload, match to a job post, rewrite.',
    image: '/img/rework.jpg',
    parts: [
      { label: 'app', value: 'Next.js · TypeScript · Tailwind' },
      { label: 'data', value: 'Prisma · Postgres' },
      { label: 'ai', value: 'OpenAI GPT-4o' },
      { label: 'infra', value: 'AWS S3 · NextAuth (Google)' },
    ],
    live: { label: 'rework.hellojakejohn.com', href: 'https://rework.hellojakejohn.com' },
    repo: 'https://github.com/hellojakejohn/ReWork-App',
    about: [
      'Upload a resume and a job description. ReWork scores the match, flags missing keywords and rewrites the weak spots, then exports a clean PDF from a few templates.',
    ],
    built: [
      'Resume upload and parsing with files stored on S3',
      'GPT-4o analysis against a specific job post',
      'Template system with one-click PDF export',
      'Google sign-in with NextAuth',
    ],
  },
]

export const credentials = [
  { title: 'Certified Solidity Developer', issuer: 'Metana', date: 'May 2026' },
  { title: 'Full-Stack Web Development Bootcamp', issuer: 'Metana', date: 'Jul 2025' },
  { title: 'Claude 101 · Claude Code 101', issuer: 'Anthropic Academy', date: '2026' },
  { title: 'JavaScript Algorithms and Data Structures · Responsive Web Design', issuer: 'freeCodeCamp', date: '' },
]

export const stack = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Solidity', 'Rust (Anchor)'] },
  { group: 'Web + mobile', items: ['React', 'Next.js', 'React Native', 'Expo', 'Node.js', 'Tailwind'] },
  { group: 'Onchain', items: ['Foundry', 'OpenZeppelin', 'wagmi', 'viem', 'Permit2', 'Uniswap V3', 'Solana'] },
  { group: 'Data + infra', items: ['Supabase', 'Postgres', 'Prisma', 'Vercel', 'AWS S3'] },
  { group: 'AI tooling', items: ['Claude Code', 'agentic workflows', 'OpenAI API', 'ElevenLabs'] },
]
