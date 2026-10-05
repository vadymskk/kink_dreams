(function () {
  var gate = document.getElementById("age-gate");
  var KEY = "kd_age_ok";
  var ok = false;
  try { ok = localStorage.getItem(KEY) === "1"; } catch (e) {}
  if (!ok) gate.hidden = false;
  document.getElementById("gate-yes").addEventListener("click", function () {
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
    gate.hidden = true;
  });
})();
