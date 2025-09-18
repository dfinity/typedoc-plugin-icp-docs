import { ParameterHint, ParameterType } from 'typedoc';
import { type MarkdownApplication, MarkdownPageEvent } from 'typedoc-plugin-markdown';
import { handleMarkdownPageEventEnd } from './handlers.ts';
import { addPageFrontmatter } from './utils/frontmatter.ts';
import { getOutputConfig } from './utils/typedoc.ts';

const DECLARATION_NAME = 'icp-docs';

export function load(app: MarkdownApplication): void {
  app.options.addDeclaration({
    name: DECLARATION_NAME,
    outputShortcut: DECLARATION_NAME,
    help: 'Docs output directory',
    type: ParameterType.Path,
    hint: ParameterHint.Directory,
  });

  const output = getOutputConfig(app, DECLARATION_NAME);
  const markdownOutput = getOutputConfig(app, 'markdown');

  app.renderer.on(MarkdownPageEvent.BEGIN, addPageFrontmatter);

  app.renderer.on(MarkdownPageEvent.END, (pageEvent) => {
    handleMarkdownPageEventEnd({ app, markdownOutput, output, pageEvent });
  });
}
