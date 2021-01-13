import postcss from 'postcss';
import { visitDocNodes } from '../src/doc';

describe('visitDocNodes', () => {
  it('should discover docs in the simplest form', () => {
    const root = postcss.parse(`
      /** Simple docs */
      .foo {}
    `);
    const doc = visitDocNodes(root.first);

    expect(doc.description).toEqual('Simple docs');
    expect(doc.tags).toEqual([]);
  });

  it('should discover docs in a simple multiline form', () => {
    const root = postcss.parse(`
      /**
       * Simple
       * docs
       */
      .foo {}
    `);
    const doc = visitDocNodes(root.first);

    expect(doc.description).toEqual('Simple docs');
    expect(doc.tags).toEqual([]);
  });

  it('should discover docs in a more complex multiline form (with a single tag)', () => {
    const root = postcss.parse(`
      /**
       * Complex
       * docs
       *
       * @var {Color} --foo-color Value used for the "color" property
       */
      .foo {}
    `);
    const doc = visitDocNodes(root.first);

    expect(doc.description).toEqual('Complex docs');
    expect(doc.tags[0].description).toEqual('Value used for the "color" property');
    expect(doc.tags[0].name).toEqual('--foo-color');
    expect(doc.tags[0].type).toEqual('Color');
    expect(doc.tags[0].tag).toEqual('var');
  });
});
