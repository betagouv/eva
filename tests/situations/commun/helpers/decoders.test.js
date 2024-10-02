import { parseSvgFromBase64Url, decodeBase64FromDataUrl } from 'commun/helpers/decoders';

describe('Helpers', function () {
  describe('#parseSvgFromBase64Url', function () {
    it('doit retourner un document SVG', function () {
      const svgDataUrl = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8cGF0aCBkPSJNMTAwIDAgCjwvcGF0aD4KPC9zdmc+Cg==';
      const svgDocument = parseSvgFromBase64Url(svgDataUrl);
      expect(svgDocument).toBeInstanceOf(Document);
    });
  });

  describe("#decodeBase64FromDataUrl", function () {
    it("doit décoder une chaîne en base64", function () {
      const dataUrl = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aD48L3BhdGg+PC9zdmc+';
      expect(decodeBase64FromDataUrl(dataUrl)).toBe('<svg version="1.0" width="100%" height="100%" viewBox="0 0 100 100"><path></path></svg>');
    });
  });
});
