(async () => {
  const body = {
    productDocumentId: "f7f9c7c9-a08a-4b1c-92fe-75f1d09b74fb",
    email: "test@test.com",
    firstName: "Test",
    lastName: "User",
    phone: "+24162123456",
    redirectURL: "http://127.0.0.1:5173/events/2/tickets?status=success"
  };
  const response = await fetch('https://api.maketou.net/api/v1/stores/cart/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer msk_65a304f493f641a99003e98f336fb741d7b9078b23f7fe41883793775d328003'
    },
    body: JSON.stringify(body)
  });
  console.log("STATUS:", response.status);
  const text = await response.text();
  console.log("BODY:", text);
})();
