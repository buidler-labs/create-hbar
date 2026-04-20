/**
 * Parses a giget-style GitHub template reference: `owner/repo` or `owner/repo#ref`.
 * Matches how {@link https://github.com/unjs/giget giget} resolves `gh:owner/repo#branch`.
 *
 * @returns `null` if the string is not an `owner/repo` community template (e.g. built-in `blank`).
 */
export function parseGithubCommunityTemplate(template: string): { owner: string; repo: string; ref: string } | null {
  const t = template.trim();
  const m = t.match(/^([\w.-]+)\/([\w.-]+)(?:#(.*))?$/);
  if (!m) return null;
  const [, owner, repo, refPart] = m;
  const ref = refPart?.trim() ? refPart.trim() : "main";
  return { owner, repo, ref };
}
