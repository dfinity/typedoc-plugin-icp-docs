function removeH1Title(input: string): string {
  return input.replace(/^\s*#\s+.*$/m, '');
}

function replaceReadmeMentions(input: string): string {
  return input.replaceAll('README.md', 'index.md');
}

export function cleanMarkdown(input: string): string {
  return removeH1Title(replaceReadmeMentions(input));
}
