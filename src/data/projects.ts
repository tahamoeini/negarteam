export type Perspective = 'products' | 'questions' | 'systems'
export type ProjectId = 'glyphmend' | 'synthora' | 'ariadne' | 'smartpack'

export type Project = {
  id: ProjectId
  name: string
  question: string
  description: string
  category: string
  system: string
  url: string
  action: string
  stage: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'glyphmend',
    name: 'GlyphMend',
    question: 'Why does information stop being useful just because someone put it inside a PDF?',
    description: 'A local-first PDF reconstruction workspace that turns documents into structured Markdown and DOCX while preserving evidence and surfacing uncertainty.',
    category: 'Documents',
    system: 'Document reconstruction · Local processing · Structured knowledge',
    url: 'https://glyphmend.negar.team/',
    action: 'Explore GlyphMend',
    stage: 'Available',
  },
  {
    id: 'synthora',
    name: 'Synthora',
    question: 'What happens when the information you need is fragmented, inconsistent, and controlled by multiple sources?',
    description: 'A browser-first investment planning tool that makes its inputs, calculations, assumptions, and uncertainty visible.',
    category: 'Markets',
    system: 'Multi-source market data · Decision support · Local-first planning',
    url: 'https://synthora.negar.team/',
    action: 'Explore Synthora',
    stage: 'Available',
  },
  {
    id: 'ariadne',
    name: 'Ariadne',
    question: 'Why does our context disappear every time we change tools or devices?',
    description: 'A local-first context continuity platform that preserves the factual thread needed to return to interrupted digital work.',
    category: 'Context',
    system: 'Context continuity · Local storage · Human-tool interaction',
    url: 'https://github.com/tahamoeini/ariadne',
    action: 'Follow Ariadne',
    stage: 'In progress',
    featured: true,
  },
  {
    id: 'smartpack',
    name: 'SmartPack',
    question: 'Can an archive be useful without asking you to install another dependency first?',
    description: 'A lossless Ubuntu archiver built on Python’s standard library, with adaptive packing, integrity checks, and defensive extraction.',
    category: 'Files',
    system: 'Adaptive compression · Integrity verification · Dependency-free tooling',
    url: 'https://github.com/tahamoeini/smartpack',
    action: 'Explore SmartPack',
    stage: 'Available',
  },
]

export const constraints = [
  ['C01', 'Understandability', 'People should remain able to understand what a system is doing.'],
  ['C02', 'Agency', 'Technology should increase people’s ability to understand, decide, create, and act.'],
  ['C03', 'Local control', 'Prefer local control when centralization is not necessary.'],
  ['C04', 'Earned complexity', 'Complexity must earn its existence.'],
  ['C05', 'Infrastructure', 'Infrastructure deserves product thinking too.'],
  ['C06', 'Trust', 'A tool should not require faith to be trusted.'],
  ['C07', 'Experimentation', 'Experiments are allowed to fail. Confusion is not.'],
] as const

export const prompts = [
  { statement: 'It uses AI.', response: 'irrelevant' },
  { statement: 'It automates an annoying workflow.', response: 'maybe' },
  { statement: 'Existing solutions already solve the problem well.', response: 'probably not' },
  { statement: 'Everyone accepts a broken assumption as normal.', response: 'now we’re interested' },
  { statement: 'It gives people more control over something they depend on.', response: 'keep going' },
] as const
