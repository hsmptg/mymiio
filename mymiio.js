const miio = require('miio');

module.exports = function(RED) {
  function MyMiioNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      miio.device({ address: config.ip, token: config.token })
        .then(device => node.device = device)
        .catch(err => RED.log.error(err));

      node.on('input', function(msg) {
        if (msg.topic === 'power') {
          node.device.setPower(msg.payload);
        }
        if (msg.topic === 'brightness') {
          node.device.setBrightness(msg.payload);
        }
      });

      node.on("close", function () {
        this.device.destroy();
      });
  }
  RED.nodes.registerType("mymiio",MyMiioNode);
}
