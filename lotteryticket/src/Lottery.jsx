import { genTicket, sum } from "./GenerateNo";
import { useState, useEffect, useMemo } from "react";
import React from "react";
import Ticket from "./Ticket";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

function Celebrate({ isWinning }) {
    useEffect(() => {
        if (isWinning) {
            console.log("🎉 Celebration started!");
        }
    }, [isWinning]);

    return isWinning ? <Fireworks autorun={{ speed: 3 }} /> : null;
}

export default function Lottery({ n, winningSum, count }) {
    let [ticket, setTicket] = useState(genTicket(n));
    let [betCount, setBetCount] = useState(0);

    let isWinning = useMemo(() => sum(ticket) === winningSum, [ticket, winningSum]);

    let buyTicket = (num) => {
        if (betCount < count) {
            setTicket(genTicket(num));
            setBetCount((prev) => prev + 1);
        }
    };

 
    useEffect(() => {
        if (betCount >= count) {
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Delay before restart
        }
    }, [betCount, count]);

    const restartGame = () => {
        window.location.reload();
    };

    return (
        <div>
            <h1>Lottery Game!</h1>
            <Ticket ticket={ticket} />
            <button onClick={() => buyTicket(n)}>Buy New Ticket</button>
            <h3>
                {isWinning && "🎉 Congratulations, you Won!"}
                {betCount >= count && "😢 Sorry, Try again"}
            </h3>
            <button onClick={restartGame}>Restart</button>
            <Celebrate isWinning={isWinning} />
        </div>
    );
}
