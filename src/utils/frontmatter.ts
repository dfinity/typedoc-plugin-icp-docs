import { ReflectionKind } from 'typedoc';
import type { MarkdownPageEvent } from 'typedoc-plugin-markdown';
import { titleFromFilename, titleFromIdCapitalized } from './string.ts';

const API_HOMEPAGE_TITLE = 'Overview';

export function addPageFrontmatter(pageEvent: MarkdownPageEvent) {
  if (!pageEvent.model || !('kind' in pageEvent.model)) return;

  let title = '';
  switch (pageEvent.model.kind) {
    case ReflectionKind.Module:
      if (pageEvent.model.name.startsWith('@')) {
        const packageName = pageEvent.model.name.split('/')[1];
        title = titleFromIdCapitalized(packageName);
      } else {
        // This is typically the case for the api homepage
        title = API_HOMEPAGE_TITLE;
      }
      break;
    case ReflectionKind.Document:
      title = titleFromIdCapitalized(pageEvent.model.name);
      break;
    default:
      title = titleFromFilename(pageEvent.model.name);
  }

  pageEvent.frontmatter = { title, ...pageEvent.frontmatter };
}
