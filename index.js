const CanvasElement = document.getElementById("canvas"),
        CTX = CanvasElement.getContext("2d");

CTX.canvas.width = window.innerWidth;
CTX.canvas.height = window.innerHeight;

const CanvasWidth = CTX.canvas.width;
const CanvasHeight = CTX.canvas.height;

let StarsX = [];
let StarsZ = [];
let StarsRadius = [];
let StarsAmount = 100;
let SpeedMultiplier = 12;

for (let i = 0; i < StarsAmount; i++)
{
    StarsX.push(Math.floor(Math.random() * (CanvasWidth - 1 + 1) + 1));
    StarsZ.push(Math.floor(Math.random() * (CanvasHeight - 1 + 1) + 1));
    StarsRadius.push(Math.floor(Math.random() * (5 - 1 + 1) + 1));
}

function AnimateStars()
{
    // Draw semi-transparent black rectangle to fade previous frame
    CTX.fillStyle = 'rgba(0, 0, 0, 0.1)';
    CTX.fillRect(0, 0, CTX.canvas.width, CTX.canvas.height);

    CTX.fillStyle = 'rgba(245, 245, 245, 1)'; // star color
    CTX.lineCap = "round";

    for (let i = 0; i < StarsAmount; i++)
    {
        let Radian = Math.atan2((window.innerWidth / 2) - StarsX[i], (window.innerHeight / 2) - StarsZ[i]);

        // Calculate star streak length based on speed
        let streakLength = StarsRadius[i] * 5;

        // Calculate start and end points of the streak line
        let startX = StarsX[i];
        let startY = StarsZ[i];
        let endX = startX + Math.sin(Radian) * streakLength;
        let endY = startY + Math.cos(Radian) * streakLength;

        // Set glow properties
        CTX.shadowColor = 'rgba(37, 0, 249, 0.7)'; // Light blue glow
        CTX.shadowBlur = 5; // Adjust blur amount as needed

        // Draw the streak line
        CTX.beginPath();
        CTX.moveTo(startX, startY);
        CTX.lineTo(endX, endY);
        CTX.lineWidth = StarsRadius[i];
        CTX.strokeStyle = 'rgba(245, 245, 245, 1)';
        CTX.stroke();

        // Reset glow properties
        CTX.shadowColor = 'transparent';
        CTX.shadowBlur = 0;

        // Update star position
        StarsZ[i] += -Math.cos(Radian) * SpeedMultiplier;
        StarsX[i] += -Math.sin(Radian) * SpeedMultiplier;

        // Reset star if out of bounds
        if (StarsX[i] > window.innerWidth || StarsZ[i] > window.innerHeight || StarsX[i] < 0 || StarsZ[i] < 0)
        {
            StarsX[i] = Math.floor(Math.random() * (CanvasWidth - 1 + 1) + 1);
            StarsZ[i] = Math.floor(Math.random() * (CanvasHeight - 1 + 1) + 1);
        }
    }
    requestAnimationFrame(AnimateStars);
}

requestAnimationFrame(AnimateStars);