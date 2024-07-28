document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clearBtn');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');

    // canvas size
    canvas.width = 800;
    canvas.height = 600;

    //  brush settings
    let currentColor = colorPicker.value;
    let currentSize = brushSize.value;


    let isDrawing = false;

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function endDrawing() {
        isDrawing = false;
        ctx.beginPath(); 
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = currentSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', endDrawing);

    clearBtn.addEventListener('click', clearCanvas);

    colorPicker.addEventListener('input', (e) => {
        currentColor = e.target.value;
    });

    brushSize.addEventListener('input', (e) => {
        currentSize = e.target.value;
        brushSizeValue.textContent = currentSize;
    });
});
