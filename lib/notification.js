const { Notification } = require('electron');

function notify(title) {
  if (Notification.isSupported()) {
    const notification = new Notification({ title });
    notification.title = title;
    notification.show();
  }
}

module.exports = {
  notify,
};
