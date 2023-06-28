import type { Route } from '~/types';

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
