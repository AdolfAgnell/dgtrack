(function() {
  function sendPayload(payload) {
    if (!payload.endpoint || !payload.apiKey) {
      console.error("DGTrack: 'endpoint' ou 'apiKey' não definidos no payload.");
      return;
    }
    fetch(payload.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": payload.apiKey
      },
      body: JSON.stringify(payload)
    }).catch(function(error) {
      console.error("DGTrack: Erro ao enviar payload:", error);
    });
  }
  var tracker = window.DGTrack || [];
  while (tracker.length > 0) {
    var eventItem = tracker.shift();
    sendPayload(eventItem);
  }

  var originalPush = tracker.push;
  tracker.push = function(item) {
    sendPayload(item);
    return originalPush.call(tracker, item);
  };
})();
