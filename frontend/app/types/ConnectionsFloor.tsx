
export interface Coordinate {
    x: number;
    y: number;
    label: string;
  }
  
  export interface ConnectionType {
    start: Coordinate;
    end: Coordinate;
    active: boolean;
  }
  
  export interface ConnectionsByFloor {
    [floor: number]: ConnectionType[];
  }
  