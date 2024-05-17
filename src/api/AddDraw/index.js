export const callAddDraw = (draw, title, description) => {
  fetch("http://localhost:3000/addDraw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      draw: draw,
      title: title,
      description: description,
    }),
  })
    .then((response) => response.json())
    .then((responseToJson) => {
      console.log(responseToJson);
    })
    .catch((error) => console.error(error));
};
