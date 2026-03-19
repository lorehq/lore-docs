export type DocsSection = 'home' | 'getting-started' | 'concepts';

export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const topTabs: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Getting Started', href: '/getting-started' },
  { label: 'Concepts', href: '/concepts' },
];

export const sectionTitles: Record<DocsSection, string> = {
  home: 'Home',
  'getting-started': 'Getting Started',
  concepts: 'Concepts',
};

export const sectionNav: Record<DocsSection, NavGroup[]> = {
  home: [
    {
      label: 'Start Here',
      items: [
        { label: 'Home', href: '/' },
        { label: 'Getting Started', href: '/getting-started' },
        { label: 'Concepts', href: '/concepts' },
      ],
    },
  ],
  'getting-started': [
    {
      label: 'Quickstart',
      items: [
        { label: 'Overview', href: '/getting-started' },
        { label: 'Get Up and Running', href: '/getting-started/get-up-and-running' },
      ],
    },
  ],
  concepts: [
    {
      label: 'Core Ideas',
      items: [
        { label: 'Overview', href: '/concepts' },
        { label: 'What Lore Is', href: '/concepts/what-lore-is' },
        { label: 'Scopes and Bundles', href: '/concepts/scopes-and-bundles' },
        { label: 'The TUI Experience', href: '/concepts/the-tui-experience' },
        { label: 'Explore and Discovery', href: '/concepts/explore-and-discovery' },
      ],
    },
  ],
};

export function isTabActive(currentSection: DocsSection, href: string): boolean {
  if (href === '/') return currentSection === 'home';
  return href === `/${currentSection}`;
}
