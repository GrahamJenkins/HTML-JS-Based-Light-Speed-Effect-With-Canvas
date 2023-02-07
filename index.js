const CanvasElement = document.getElementById("canvas"),
        CTX = CanvasElement.getContext("2d");

CTX.canvas.width = window.innerWidth;
CTX.canvas.height = window.innerHeight;

const CanvasWidth = CTX.canvas.width;
const CanvasHeight = CTX.canvas.height;

CTX.fillStyle = "rgba(245, 245, 245, 1)";

let StarsX = [];
let StarsZ = [];
let StarsRadius = [];
let StarsAmount = 100;
let SpeedMultiplier = 7.5;

for (i = 0; i < StarsAmount; i++)
{
    StarsX.push(Math.floor(Math.random() * (CanvasWidth - 1 + 1) + 1));
    StarsZ.push(Math.floor(Math.random() * (CanvasHeight - 1 + 1) + 1));
    StarsRadius.push(Math.floor(Math.random() * (5 - 1 + 1) + 1));

    CTX.beginPath();
    CTX.arc(StarsX[i], StarsZ[i], StarsRadius[i], 0, Math.PI * 2, true);
    CTX.fill();
}

function AnimateStars()
{
    CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);

    for (let i = 0; i < StarsAmount; i++)
    {
        if (StarsX[i] > window.innerWidth || StarsZ[i] > window.innerHeight || StarsX[i] < 0 || StarsZ[i] < 0)
        {
            StarsX[i] = Math.floor(Math.random() * (CanvasWidth - 1 + 1) + 1);
            StarsZ[i] = Math.floor(Math.random() * (CanvasHeight - 1 + 1) + 1);
        }

        CTX.beginPath();
        CTX.arc(StarsX[i], StarsZ[i], StarsRadius[i], 0, Math.PI * 2, true);
        CTX.fill();

        let Radian = Math.atan2((window.innerWidth / 2) - StarsX[i], (window.innerHeight / 2) - StarsZ[i]);
        StarsZ[i] += -Math.cos(Radian) * SpeedMultiplier;
        StarsX[i] += -Math.sin(Radian) * SpeedMultiplier;
    }
    requestAnimationFrame(AnimateStars);
}

requestAnimationFrame(AnimateStars);