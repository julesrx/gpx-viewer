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

export type { Route, Coordinate, Segment, Point };
