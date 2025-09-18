import type { OutputSpecification } from 'typedoc';
import type { MarkdownApplication } from 'typedoc-plugin-markdown';

export function getOutputConfig(app: MarkdownApplication, outputName: string): OutputSpecification {
  const output = app.options.getValue('outputs').find((o) => o.name === outputName);
  if (!output) {
    throw new Error(`Output ${outputName} not found`);
  }
  return output;
}
