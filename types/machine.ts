export interface Machine {
  id: number;

  slug: string;

  name: string;

  brand: string;

  category: string;

  image: string;

  description: string;

  compatibleProducts: string[];

  specifications: {
    WorkingHeight?: string;
    PlatformHeight?: string;
    HorizontalReach?: string;
    LiftCapacity?: string;
    MachineWeight?: string;
    PowerSource?: string;
    DriveSpeed?: string;
    Gradeability?: string;
    PlatformRotation?: string;
    TurntableRotation?: string;
    OverallWidth?: string;
    OverallLength?: string;
    OverallHeight?: string;
    FuelType?: string;
    Engine?: string;
    Tyres?: string;
    [key: string]: string | undefined;
  };
}