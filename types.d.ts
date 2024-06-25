interface Task {
    id: number;
    description: string;
    status: string;
    progress: number;
  }
  
  interface Result {
    taskId: number;
    result: string;
    data: { x: number; y: number }[];
    constraints: {
      temperature: number;
      iterations: number;
      coolingRate: number;
    };
  }