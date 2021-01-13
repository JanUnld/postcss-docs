# PostCSS Docs

[PostCSS](https://github.com/postcss/postcss) plugin for doc comments.

```css
/**
 * More complex doc
 *
 * @var {Color} --foo-color The value used as "color"
 */
.foo {
  color: var(--foo-color, currentColor);
}
```

After processing the above `css` source the result AST will contain additional information
extracted from the parsed comments. **Parsing is not part of the implementation of this
package!** Parsing is done using [`comment-parser`](https://github.com/syavorsky/comment-parser).
Both, the targeted `Rule` node as well as the `Comment` node will contain a `doc` field after
the processing is done.

```javascript
{
  "description": "More complex doc",
  "text": "/** ... */",
  // postcss ChildNode, can be null
  "target": { ... },
  "tags": [
    {
      "tag": "var",
      "description": "The value used as \"color\"",
      "name": "--foo-color",
      "type": "Color",
      "optional": false
      ...
    }
  ],
  // from comment-parser
  "source": [ ... ],
  // from comment-parser
  "problems": [ ... ]
}
```

##### Useful Links

- [`comment-parser` Result API](https://github.com/syavorsky/comment-parser#result)
- [`postcss` API](https://postcss.org/api)

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-docs
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js` in the project
root, `"postcss"` section in `package.json` or `postcss` in bundle config.

If you do not use PostCSS, add it according to the [official docs](https://github.com/postcss/postcss#usage).

**Step 3:** Add the plugin to your config

```diff
module.exports = {
  plugins: [
+   require('postcss-docs')
  ]
}
```
