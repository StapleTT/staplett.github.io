import { getCollection, type CollectionEntry } from 'astro:content';

export const EMAIL = 'staplett@pm.me';
export const GITHUB = 'https://github.com/StapleTT';
export const PUBLIC_REPOS = 17;

export const SKILLS: Record<string, string[]> = {
  Languages: ['Python', 'TypeScript/JavaScript', 'Bash', 'Go', 'Java', 'C#', 'SQL', 'HTML/CSS', 'QML'],
  'Web and data': ['Flask', 'React', 'Fastify', 'Express', 'PostgreSQL', 'MariaDB', 'SQLite'],
  Systems: ['Linux (Arch, Fedora, Ubuntu Server, Debian)', 'Proxmox VE', 'LXC', 'KVM/QEMU', 'Docker', 'systemd'],
  'Networking and security': ['NGINX reverse proxy', 'WireGuard', "TLS/Let's Encrypt", 'DNS (Pi-hole)', 'Firewalls', 'SSH hardening', 'OAuth 2.0', 'Packet capture (TShark)'],
  Tools: ['Git', 'Vim', 'Android Studio'],
};

export type Project = CollectionEntry<'projects'>;

/** Published projects, sorted. A project gets a detail page only if its markdown has a body. */
export async function getProjects() {
  const all = await getCollection('projects', (p) => import.meta.env.DEV || !p.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const hasPage = (p: Project) => Boolean(p.body?.trim());
export const projectHref = (p: Project) => (hasPage(p) ? `/projects/${p.id}/` : (p.data.repo ?? p.data.live ?? GITHUB));
