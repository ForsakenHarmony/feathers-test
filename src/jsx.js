import { h } from 'preact';

export default function jsx(jsxObject) {
  return h(
    jsxObject.elementName,
    jsxObject.attributes,
    jsxObject.children,
  );
}
