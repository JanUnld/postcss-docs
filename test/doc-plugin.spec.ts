import postcss from 'postcss';
import docs from '../';
import { DocNode } from '../src/doc';

describe('postcss-docs', () => {
  it('should parse and attach doc information', async () => {
    const root = await postcss([docs()]).process(`
      /** Simple doc */
      .foo {}

      /* No doc */
      .bar {}
    `)?.root;

    expect((root.first as DocNode).doc.description).toEqual('Simple doc');
    expect((root.first.next() as DocNode).doc).not.toBeNull();
    expect((root.nodes[2] as DocNode).doc).toBeUndefined();
    expect((root.nodes[2].next() as DocNode).doc).toBeUndefined();
  });
});
