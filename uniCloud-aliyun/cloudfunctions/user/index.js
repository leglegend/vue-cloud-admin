"use strict";
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log("event : ", event);

  //返回数据给客户端
  if (event.method == "login") {
    return {
      data: {
        token: "123",
      },
      status: 200,
    };
  }

  return {
    status: 200,
    message: "success",
  };
};
