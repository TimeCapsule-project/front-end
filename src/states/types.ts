export enum CapsuleType {
  ANYWHERE = 'anywhere',
  SPECIAL = 'special',
}

export type CapsuleStateData = {
  capsuleType: CapsuleType;
  capsuleColorIndex: number;
  content: string;
  date: { date: string; time: string };
  isAllDay: boolean;
  from: string;
};
