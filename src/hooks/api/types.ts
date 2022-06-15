export type CommonLoginRequestData = { userId: string; userPw: string };

export type LoginResponseData = {
  data: {
    access_TOKEN: string;
    refresh_TOKEN: string;
    userId: number;
    userEmail: string;
    userNickname: string;
  };
};

export type SendCapsuleItem = {
  capsuleId: number;
  capsuleType: number;
  content: string;
  duration: string;
  recipient: string;
  nickname: string;
  location: {
    x: number;
    y: number;
  };
  opened: boolean;
};

export type ArrivedCapsuleItem = {
  capsuleId: number;
  capsuleType: number;
  recipient: string;
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
  userEmail: string;
  userNickname: string;
};

export type ChangeNicknameResponseData = {
  data: {
    userId: string;
    userNickname: string;
  };
};
