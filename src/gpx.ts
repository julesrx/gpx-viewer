type Route = {
  name?: string;
  createdDate?: string;
  points: Coordinate[];
  trace: Trace;
};

type Coordinate = {
  name?: string;
  lat: number;
  lon: number;
};

type Trace = {
  segments: Segment[];
};

type Segment = {
  lat: number;
  lon: number;
};

const getRoute = (doc: Document) => {
  const route: Route = { points: [], trace: { segments: [] } };

  route.name = doc.querySelector('metadata > name')?.innerHTML;
  route.createdDate = doc.querySelector('metadata > time')?.innerHTML;

  for (const point of doc.querySelectorAll('rte rtept')) {
    route.points.push({
      name: point.querySelector('name')?.innerHTML,
      lat: Number(point.getAttribute('lat')!),
      lon: Number(point.getAttribute('lon')!)
    });
  }

  for (const segment of doc.querySelectorAll('trk trkseg trkpt')) {
    route.trace.segments.push({
      lat: Number(segment.getAttribute('lat')!),
      lon: Number(segment.getAttribute('lon')!)
    });
  }

  return route;
};

export { getRoute };
export type { Route };
