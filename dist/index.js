import { ReflectionKind, ParameterHint, ParameterType } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";
import path from "node:path";
function removeH1Title(input) {
  return input.replace(/^\s*#\s+.*$/m, "");
}
function replaceReadmeMentions(input) {
  return input.replaceAll("README.md", "index.md");
}
function cleanMarkdown(input) {
  return removeH1Title(replaceReadmeMentions(input));
}
function handleMarkdownPageEventEnd({
  app,
  markdownOutput,
  output,
  pageEvent
}) {
  if ("id" in pageEvent.model && pageEvent.model.id === 0) {
    app.logger.info(`Skipping root index page: ${pageEvent.url}`);
    pageEvent.contents = "Not included in the docs";
    return;
  }
  if (typeof pageEvent.contents === "string") {
    pageEvent.contents = cleanMarkdown(pageEvent.contents);
  }
  let fileRelativePath = path.relative(markdownOutput.path, pageEvent.filename);
  if (fileRelativePath.startsWith("documents/")) {
    fileRelativePath = fileRelativePath.replace("documents/", "");
    const filename = path.basename(fileRelativePath);
    fileRelativePath = path.join(path.dirname(fileRelativePath), filename.toLowerCase());
  }
  pageEvent.filename = path.join(output.path, fileRelativePath);
}
function idFromFilename(fileName) {
  return fileName.replace(/\.mdx?$/, "");
}
function titleFromFilename(fileName) {
  return titleFromId(idFromFilename(fileName));
}
function titleFromId(id) {
  return id.replace(/-/g, " ");
}
function titleFromIdCapitalized(id) {
  return titleFromId(id).toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
const API_HOMEPAGE_TITLE = "Overview";
function addPageFrontmatter(pageEvent) {
  if (!pageEvent.model || !("kind" in pageEvent.model)) return;
  let title = "";
  switch (pageEvent.model.kind) {
    case ReflectionKind.Module:
      if (pageEvent.model.name.startsWith("@")) {
        const packageName = pageEvent.model.name.split("/")[1];
        title = titleFromIdCapitalized(packageName);
      } else if (pageEvent.model.name === "api" && pageEvent.model.parent?.name.startsWith("@")) {
        title = API_HOMEPAGE_TITLE;
      } else {
        title = titleFromIdCapitalized(pageEvent.model.name);
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
function getOutputConfig(app, outputName) {
  const output = app.options.getValue("outputs").find((o) => o.name === outputName);
  if (!output) {
    throw new Error(`Output ${outputName} not found`);
  }
  return output;
}
const DECLARATION_NAME = "icp-docs";
function load(app) {
  app.options.addDeclaration({
    name: DECLARATION_NAME,
    outputShortcut: DECLARATION_NAME,
    help: "Docs output directory",
    type: ParameterType.Path,
    hint: ParameterHint.Directory
  });
  const output = getOutputConfig(app, DECLARATION_NAME);
  const markdownOutput = getOutputConfig(app, "markdown");
  app.renderer.on(MarkdownPageEvent.BEGIN, addPageFrontmatter);
  app.renderer.on(MarkdownPageEvent.END, (pageEvent) => {
    handleMarkdownPageEventEnd({ app, markdownOutput, output, pageEvent });
  });
}
export {
  load
};
