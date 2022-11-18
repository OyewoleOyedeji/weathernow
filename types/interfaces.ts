export interface settings {
  useBrowserLocation: boolean;
  unit: string;
}

export interface position {
  longitude: number;
  latitude: number;
}

export interface error {
  hasOccurred: boolean;
  message: string;
}
