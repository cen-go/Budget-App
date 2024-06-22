const chartEl = document.querySelector(".chart");
const canvas = document.createElement("canvas");
canvas.width = 50;
canvas.height = 50;

chartEl.append(canvas);

const canvasContext = canvas.getContext("2d");

const drawCircle = (color, ratio, anticlockwise) => {
  canvasContext.strokeStyle = color;
  canvasContext.lineWidth = 8;
  canvasContext.beginPath();
  canvasContext.arc(canvas.width/2, canvas.height/2, 20, 0, ratio*2*Math.PI, anticlockwise);
  canvasContext.stroke();
};

const updateChart = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  let ratio = income / (income + outcome);
  drawCircle("#64b06c", -ratio, true);
  drawCircle("#f35d46", 1 - ratio, false);
};