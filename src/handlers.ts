import path from 'node:path';
import type { OutputSpecification } from 'typedoc';
import type { MarkdownApplication, MarkdownPageEvent } from 'typedoc-plugin-markdown';
import { cleanMarkdown } from './utils/markdown.ts';

type HandleMarkdownPageEventEndOpts = {
  app: MarkdownApplication;
  markdownOutput: OutputSpecification;
  output: OutputSpecification;
  pageEvent: MarkdownPageEvent;
};

export function handleMarkdownPageEventEnd({
  app,
  markdownOutput,
  output,
  pageEvent,
}: HandleMarkdownPageEventEndOpts) {
  if ('id' in pageEvent.model && pageEvent.model.id === 0) {
    app.logger.info(`Skipping root index page: ${pageEvent.url}`);
    pageEvent.contents = 'Not included in the docs';
    return;
  }

  if (typeof pageEvent.contents === 'string') {
    pageEvent.contents = cleanMarkdown(pageEvent.contents);
  }

  let fileRelativePath = path.relative(markdownOutput.path, pageEvent.filename);

  // Flatten documents/ into root and make filename lowercase
  if (fileRelativePath.startsWith('documents/')) {
    fileRelativePath = fileRelativePath.replace('documents/', '');
    const filename = path.basename(fileRelativePath);
    fileRelativePath = path.join(path.dirname(fileRelativePath), filename.toLowerCase());
  }

  // Finally, set the output directory to the one provided in the config
  pageEvent.filename = path.join(output.path, fileRelativePath);
}
