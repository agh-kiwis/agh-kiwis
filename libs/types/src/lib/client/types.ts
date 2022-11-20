export type IntervalType = {
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
};

type TaskType = {
  type: string;
  category: {
    id: number;
    name: string;
    color: string;
  };
  taskName: string;
  chillTime: {
    minutes: number;
  };
  chillTimeFacade: string;
  notify: boolean;
  autoResolve: boolean;
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
    repeatEvery: {
      type: string;
      amount: number;
    };
    repeatUntil: string;
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

export type SleepPreferencesType = {
  sleep: string;
  wakeUp: string;
};
