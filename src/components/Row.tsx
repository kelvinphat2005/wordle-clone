import { COLORS } from "../Global.tsx";
import type { validColor } from "../Global.tsx";

const SIZE = 75;

interface Row {
    values: string[];
    colors: validColor[];
    submitted: boolean;
}

function Row({values, colors, submitted} : Row) {
    return(
        <div className="flex flex-row gap-1 py-0.5">
        {Array.from({length: 5}, (_, i) => {
            let fill : boolean = true // determine if background color will be filled with the colors grey, yellow, green
            let bgColor : string = COLORS[0]; // default color is black (0)
            if (colors[i] != null) {
                bgColor = COLORS[colors[i]];
            }
            
            let display : string = ""
            if (values[i] == null) {
                fill = false;
            } else {
                display = values[i];
            }
            
            if (submitted){
                return(
                    <div key={i} style={{width:SIZE+"px",height:SIZE+"px",backgroundColor:fill ? bgColor : "#000000"}} className="flex items-center justify-center font-semibold">
                    {/* This is each individual square :) */}
                    {display.toLocaleUpperCase()}
                </div>)
            } else {
                return(
                    <div key={i} style={{width:SIZE+"px",height:SIZE+"px",backgroundColor:COLORS[0]}} className="flex items-center justify-center font-semibold">
                    {display.toLocaleUpperCase()}
                    </div>
                )
            }
        })} 
        </div>
        
    );   
}

export default Row;