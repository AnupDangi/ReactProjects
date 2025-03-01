import "./Ticket.css";
import TicketNum from "./TicketNum";
export default function Ticket({ticket}){
    return(<div className="Ticket">
            <h3>Lottery Ticket</h3>
            {
                ticket.map((num,idx)=>(
                <TicketNum num={num} key={idx}/>
            ))}
    </div>)
}