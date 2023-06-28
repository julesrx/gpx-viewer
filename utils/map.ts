import { fromLonLat } from 'ol/proj';
import type Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import OlPoint from 'ol/geom/Point';

import type { Segment, Point } from '~/types';

const drawPoints = (map: Map, points: Point[]) => {
  const source = new VectorSource();
  const layer = new VectorLayer({ source });

  source.clear(true);
  for (const { lon, lat } of points) {
    const point = new OlPoint(fromLonLat([lon, lat]));
    source.addFeature(new Feature(point));
  }

  map.addLayer(layer);
};

const drawTrace = (map: Map, segments: Segment[], firstPoint: Point, lastPoint: Point) => {
  const firstSegment = computed(() => segments[0]);

  const source = new VectorSource();
  const layer = new VectorLayer({ source });

  const l = new LineString([
    fromLonLat([firstPoint.lon, firstPoint.lat]),
    fromLonLat([firstSegment.value.lon, firstSegment.value.lat])
  ]);

  source.addFeature(new Feature(l));

  for (let i = 0; i < segments.length; i++) {
    const current = segments[i];

    const next = i === segments.length - 1 ? lastPoint : segments[i + 1];

    const line = new LineString([
      fromLonLat([current.lon, current.lat]),
      fromLonLat([next.lon, next.lat])
    ]);

    source.addFeature(new Feature(line));
  }

  map.addLayer(layer);
};

export { drawPoints, drawTrace };
