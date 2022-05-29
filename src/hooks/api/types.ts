export type CommonLoginRequestData = { userId: string; userPw: string };

export type LoginResponseData = {
  data: {
    access_TOKEN: string;
    refresh_TOKEN: string;
    userId: number;
    userNickname: string;
  };
};

export type SendCapsuleItem = {
  capsuleId: number;
  isOpened: boolean;
  nickname: string;
};

export type ArrivedCapsuleItem = {
  capsuleId: number;
  capsuleType: number;
  recipient: number;
  sender: string;
  nickname: string;
  content: string;
  duration: string;
  location: {
    x: number;
    y: number;
  };
  opened: boolean;
};

export type GetSendCapsuleResponseData = {
  data: SendCapsuleItem[];
};

export type GetArrivedCapsuleResponseData = {
  data: ArrivedCapsuleItem[];
};

export type UserInfo = {
  userId: number;
  userNickname: string;
};
