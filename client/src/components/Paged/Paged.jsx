import React from "react";
import './Paged.css';



export default function Paged({paged, all, recipesPerPage}) {

    const numbers = [];
    for(let i = 1; i <= Math.ceil(all/recipesPerPage); i++){
        numbers.push(i)
    }


    return (
        <div>
            <span id='tools'>🍴</span>
            { numbers && numbers?.map(number => {
                return (
                    <button id='button_pag' key={number} onClick={() => paged(number)}>{number}</button>
                )
            })}
            <span id='tools'>🍴</span>
        </div>
    )


}