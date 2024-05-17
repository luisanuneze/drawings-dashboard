"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import { callAddDraw } from "@/api/AddDraw";

const styles = {
  canvas: {
    border: "1px solid #333",
    margin: "20px 0px",
  },

  maindiv: {
    padding: "10px",
    margin: "auto",
    width: "800px",
  },

  button: {
    border: "0px",
    margin: "1px",
    height: "50px",
    minWidth: "75px",
  },

  colorSwatches: {
    red: { backgroundColor: "red" },
    orange: { backgroundColor: "orange" },
    yellow: { backgroundColor: "yellow" },
    green: { backgroundColor: "green" },
    blue: { backgroundColor: "blue" },
    purple: { backgroundColor: "purple" },
    black: { backgroundColor: "black" },
  },
};

const DrawApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"draw" | "erase">("draw");
  const [pen, setPen] = useState<"up" | "down">("up");
  const [lineWidth, setLineWidth] = useState<number>(10);
  const [penColor, setPenColor] = useState<string>("black");
  const [penCoords, setPenCoords] = useState<[number, number]>([0, 0]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const reset = () => {
    setMode("draw");
    setPen("up");
    setLineWidth(10);
    setPenColor("black");
    setPenCoords([0, 0]);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 600);
        ctx.lineWidth = 10;
        ctxRef.current = ctx;
      }
    }
  };

  useEffect(() => {
    reset();
  }, []);

  const drawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (pen === "down") {
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";

        if (mode === "draw") {
          ctx.strokeStyle = penColor;
        }

        if (mode === "erase") {
          ctx.strokeStyle = "#ffffff";
        }

        ctx.moveTo(penCoords[0], penCoords[1]);
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();

        setPenCoords([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
      }
    }
  };

  const penDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setPen("down");
    setPenCoords([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
  };

  const penUp = () => {
    setPen("up");
  };

  const saveDrawing = async () => {
    if (!canvasRef.current) return;

    const drawingData = canvasRef.current.toDataURL("image/png");
    console.log("Base64 Image Data:", drawingData);

    const savedDrawings = JSON.parse(
      localStorage.getItem("savedDrawings") || "[]",
    );

    const newDrawing = {
      date: Date.now(),
      drawing: drawingData,
    };

    savedDrawings.push(newDrawing);

    localStorage.setItem("savedDrawings", JSON.stringify(savedDrawings));

    console.log("Drawing saved!");
    console.log("Saved Drawings:", savedDrawings);

    router.push("/");
  };

  const router = useRouter();

  return (
    <div style={styles.maindiv}>
      <canvas
        ref={canvasRef}
        width="800px"
        height="600px"
        style={styles.canvas}
        onMouseMove={drawing}
        onMouseDown={penDown}
        onMouseUp={penUp}
      ></canvas>
      <div>
        <button onClick={() => setMode("draw")} style={styles.button}>
          Draw
        </button>
        <button onClick={() => setMode("erase")} style={styles.button}>
          Erase
        </button>
        <button onClick={reset} style={styles.button}>
          Reset
        </button>
        <button onClick={saveDrawing} style={styles.button}>
          Save
        </button>
      </div>
      <div>
        <button
          style={{ ...styles.colorSwatches.red, ...styles.button }}
          onClick={() => setPenColor("red")}
        >
          Red
        </button>
        <button
          style={{ ...styles.colorSwatches.orange, ...styles.button }}
          onClick={() => setPenColor("orange")}
        >
          Orange
        </button>
        <button
          style={{ ...styles.colorSwatches.yellow, ...styles.button }}
          onClick={() => setPenColor("yellow")}
        >
          Yellow
        </button>
        <button
          style={{ ...styles.colorSwatches.green, ...styles.button }}
          onClick={() => setPenColor("green")}
        >
          Green
        </button>
        <button
          style={{ ...styles.colorSwatches.blue, ...styles.button }}
          onClick={() => setPenColor("blue")}
        >
          Blue
        </button>
        <button
          style={{ ...styles.colorSwatches.purple, ...styles.button }}
          onClick={() => setPenColor("purple")}
        >
          Purple
        </button>
        <button
          style={{ ...styles.colorSwatches.black, ...styles.button }}
          onClick={() => setPenColor("black")}
        >
          Black
        </button>
      </div>
    </div>
  );
};

const SignIn: React.FC = () => {
  return (
    <DefaultLayout>
      <DrawApp />
    </DefaultLayout>
  );
};

export default SignIn;
