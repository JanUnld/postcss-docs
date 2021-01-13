import { parse as parseComment } from 'comment-parser';
import { Block } from 'comment-parser/lib/primitives';
import { ChildNode, Comment, Node } from 'postcss';

export interface Doc extends Block {
  target: ChildNode;
  text: string;
}

export type DocNode = ChildNode & { doc: Doc };

export function isComment(node: Node): node is Comment {
  return node instanceof Comment;
}

export const DOC_COMMENT_START = '/**';

export function visitDocNodes(node: Node): Doc | null {
  // if the given node nor its previous ancestor is a comment, we don't have anything to doc
  if (!isComment(node) && !isComment(node.prev())) return;
  // otherwise we can get the target as well as the comment node and continue parsing the doc
  let text: string, target: ChildNode;
  if (isComment(node)) {
    text = node.toString();
    target = node.next();
  } else {
    text = (node.prev() as Comment)?.toString();
    target = node as ChildNode;
  }
  // check if the text we identified as doc text does start with the given prefix, if not no doc is given
  if (!text.startsWith(DOC_COMMENT_START)) return;
  // otherwise finish parsing the doc text and return the result
  const block = parseComment(text)[0];
  return { ...block, text, target };
}
