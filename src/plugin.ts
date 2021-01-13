import { Plugin } from 'postcss';
import { DOC_COMMENT_START, DocNode, visitDocNodes } from './doc';

export default () => {
  return {
    postcssPlugin: 'postcss-doc',

    Comment(comment) {
      if ('doc' in comment) return;
      if (comment.toString().startsWith(DOC_COMMENT_START)) {
        const doc = visitDocNodes(comment);

        if (doc != null) {
          (doc.target as DocNode).doc = doc;
          (comment as DocNode).doc = doc;
        }
      }
    },
  } as Plugin;
};
export const postcss = true;
