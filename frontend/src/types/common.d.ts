interface IStation {
  id?: number;
  geometry?: {
    x: number;
    y: number;
  };
  latitude?: number;
  longitude?: number;
  address?: string;
  provider?: string;
  quantity?: number;
  availability?: boolean;
  createdAt?: string;
}

interface ILocationState {
  stationId: number;
}

type AppState = {
  error: Error | null;
};

type Action = {
  type: string;
  payload: any;
};
