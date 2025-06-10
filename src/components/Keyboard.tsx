import { COLORS } from "../Global";
import type { validColor } from "../Global";

const HEIGHT = 58;
const WIDTH = 43;

const KEYS: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"]
];

interface Keys {
    mapping : Map<string, validColor>;
};

function Keys({mapping} : Keys) {
    return(
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-1 py-0.5">
            {
                KEYS[0].map((value, index) => {
                    const colorIndex = mapping.has(value) ? (mapping.get(value) === 1 ? 0 : mapping.get(value)!): 1;
                    return(
                        <div key={index} style={{height:HEIGHT+"px",width:WIDTH+"px",backgroundColor:COLORS[colorIndex]}} className="flex items-center justify-center font-semibold rounded-lg">
                            {value.toUpperCase()}
                        </div>
                    );
                })
            }
        </div>
        <div className="flex flex-row gap-1 py-0.5">
            {
                KEYS[1].map((value, index) => {
                    const colorIndex = mapping.has(value) ? (mapping.get(value) === 1 ? 0 : mapping.get(value)!): 1;
                    return(
                        <div key={index} style={{height:HEIGHT+"px",width:WIDTH+"px",backgroundColor:COLORS[colorIndex]}} className="flex items-center justify-center font-semibold rounded-lg">
                            {value.toUpperCase()}
                        </div>
                    );
                })
            }
        </div>
        <div className="flex flex-row gap-1 py-0.5">
            {
                KEYS[2].map((value, index) => {
                    const colorIndex = mapping.has(value) ? (mapping.get(value) === 1 ? 0 : mapping.get(value)!): 1;
                    return(
                        <div key={index} style={{height:HEIGHT+"px",width:WIDTH+"px",backgroundColor:COLORS[colorIndex]}} className="flex items-center justify-center font-semibold rounded-lg">
                            {value.toUpperCase()}
                        </div>
                    );
                })
            }
        </div>
    </div>
    );
}

export default Keys;