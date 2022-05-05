type OnMessageParam = {
  nativeEvent: any;
};

type ProcessAction = {
  type: string;
  data: any;
};

type ProcessCallback = (data: any) => void;

async function process(action: ProcessAction, callback?: ProcessCallback) {
  switch (action.type) {
    case 'SEND_CURRENT_ADDRESS':
      callback && callback(action.data);
      break;
    default:
      break;
  }
}

async function onMessage(msg: OnMessageParam, callback?: ProcessCallback) {
  const { nativeEvent } = msg;
  const response = nativeEvent?.data && JSON.parse(nativeEvent.data);
  console.log(response);
  return await process(response, callback);
}

export type { OnMessageParam };
export { onMessage };
