const parseXml = (xml: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');

  return doc;
};

export { parseXml };
