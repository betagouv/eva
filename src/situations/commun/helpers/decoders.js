function parseSvgFromBase64Url(svgDataUrl) {
  const decodedSvg = decodeBase64FromDataUrl(svgDataUrl);
  const parser = new DOMParser();
  const svgDocument = parser.parseFromString(decodedSvg, "image/svg+xml");
  return svgDocument;
}

function decodeBase64FromDataUrl(dataUrl) {
  if (!dataUrl) {
    return;
  }
  return atob(dataUrl.split(',')[1]);
}

export { parseSvgFromBase64Url, decodeBase64FromDataUrl };
