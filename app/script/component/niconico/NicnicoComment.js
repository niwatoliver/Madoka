import Nico from "node-nicovideo-api";
import Net from 'net';

export const NiconicoComment = {
  pullComment:
    Nico.login("", "")
      .then(session => session.live.getLiveInfo("lv308307054"))
      .then(live => {
        console.log(live);
        const net = Net.connect(live._attr.comment.port, live._attr.comment.addr);
        net.on('connect', () => {
          net.setEncoding('utf-8');
          net.write('<thread thread="' + live._attr.comment.thread + '" res_from="-5" version="20061206"/>\0');
          console.log(net);
        });
        net.on('data', function (data) {
          console.log(data);
        });
      })
};