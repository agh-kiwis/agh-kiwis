export type constTaskType = {
  type: string;
  category: {
    color: string;
    name: string;
  };
  color: string;
  taskName: string;
  startTime: {
    date: string;
    time: string;
  };
  startTimeFacade: string;
  duration: {
    hours: number;
    minutes: number;
  };
  durationFacade: string;
  chillTime: {
    minutes: number;
  };
  chillTimeFacade: string;
  priority: string;
  repeat: {
    shouldRepeat: boolean;
    startFrom: string;
    repeatEvery: {
      type: string;
      amount: number;
    };
  };
  repeatEveryFacade: string;
  notify: boolean;
  autoresolve: boolean;
};

export type floatTaskType = {
  type: string;
  category: {
    color: string;
    name: string;
  };
  color: string;
  taskName: string;
  deadline: {
    date: string;
    time: string;
  };
  deadlineFacade: string;
  timeEstimation: {
    hours: number;
    minutes: number;
  };
  timeEstimationFacade: string;
  chillTime: {
    minutes: number;
  };
  chillTimeFacade: string;
  priority: string;
  chunking: {
    shouldChunk: boolean;
    numberOfChunks: number;
    repeatEvery: {
      type: string;
      amount: number;
    };
  };
  repeatEveryFacade: string;
  notify: boolean;
  autoresolve: boolean;
};
