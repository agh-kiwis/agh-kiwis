type TaskType = {
  type: string;
  category: {
    id: number;
    name: string;
    color: string;
  };
  color: string;
  taskName: string;
  chillTime: {
    minutes: number;
  };
  chillTimeFacade: string;
  notify: boolean;
  autoresolve: boolean;
};

export type ConstTaskType = TaskType & {
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
};

export type FloatTaskType = TaskType & {
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
  priority: string;
  chunking: {
    shouldChunk: boolean;
    minChunkTime: {
      minutes: number;
    };
    maxChunkTime: {
      hours: number;
      minutes: number;
    };
    minTimeBetweenChunks: {
      hours: number;
      minutes: number;
    };
  };
  minChunkTimeFacade: string;
  maxChunkTimeFacade: string;
  minTimeBetweenChunksFacade: string;
};

export type UserDetailsType = {
  id?: number;
  name: string;
  birthDate: string;
  gender: string;
};
