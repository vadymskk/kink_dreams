// Web push via OneSignal. Replace APP_ID with the one from your OneSignal dashboard.
var APP_ID = "0418e7a4-4804-41a1-8229-fe346bcb2fcf";

(function () {
  var btn = document.getElementById("notify-btn");
  var msg = document.getElementById("notify-status");
  var ready = false;

  function say(t) { msg.textContent = t; }

  if (APP_ID.indexOf("YOUR_") === 0) {
    btn.addEventListener("click", function () { say("Notifications are not configured yet."); });
    return;
  }

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  var s = document.createElement("script");
  s.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
  s.defer = true;
  document.head.appendChild(s);

  OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.init({ appId: APP_ID, notifyButton: { enable: false } });
    ready = true;
    if (OneSignal.Notifications.permission) done();
  });

  function done() {
    document.getElementById("notify-label").textContent = "You're on the list";
    btn.disabled = true;
    say("We'll notify you when the website launches.");
  }

  // The permission prompt must be triggered by a user click.
  btn.addEventListener("click", function () {
    if (!ready) { say("Still loading, try again in a moment."); return; }
    OneSignalDeferred.push(async function (OneSignal) {
      if (!OneSignal.Notifications.isPushSupported()) {
        say("This browser can't receive notifications. On iPhone, add this page to your Home Screen first.");
        return;
      }
      await OneSignal.Notifications.requestPermission();
      if (OneSignal.Notifications.permission) done();
      else say("Notifications are blocked. Allow them in your browser's site settings.");
    });
  });
})();
