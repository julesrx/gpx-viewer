type Coordinate = {
  lat: number;
  lon: number;
};

interface Route {
  name?: string;
  createdDate?: string;
  points: Point[];
  trace: Trace;
}

interface Point extends Coordinate {
  name?: string;
}

interface Trace {
  segments: Segment[];
}

interface Segment extends Coordinate {}

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
export type { Route, Coordinate };
