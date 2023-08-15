import { io } from "socket.io-client";

// const socket = (path?: string) => {
//   const url = "ws://localhost:7500";
//   const customUrl = path ? url + path : url;
//   return io(customUrl);
// };

// export default socket;


const socketUrlBase = process.env.URL_SOCKET;
export default (url: string) => {
  return io(`${socketUrlBase}${url}`, {
    // extraHeaders: {
    //   user: id ?? "null",
    // },
  });
};