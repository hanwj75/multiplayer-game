//모든 핸들러를 관리하는 index

import { HANDLER_IDS } from "../constants/handlerIds.js";
import initialHandler from "./user/initial.handler.js";

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: "initial.InitialPayload",
  },
};

//핸들러 ID

//맵핑한 핸들러를 호출하는 함수
export const getHandlerById = (handlerId) => {
  let handlerIds = handlers[handlerId];
  if (!handlers[handlerId]) {
    throw Error();
  }

  return handlers[handlerId].handler;
};

//외부에서 핸들러를 읽을수 있게 해주는 함수
//핸들러를 읽어서 protoType을 불러내는 로직
export const getProtoTypeNameByHandlerId = (handlerId) => {
  let handlerIds = handlers[handlerId];
  console.log(`🤪 ~ file: index.js:29 ~ getProtoTypeNameByHandlerId ~ handlerIds:`, handlerIds);
  if (!handlers[handlerId]) {
    throw Error();
  }

  //handlers[핸들러ID].[packetName]
  return handlers[handlerId].protoType;
};
