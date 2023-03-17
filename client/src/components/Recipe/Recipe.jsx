import React from "react";
import './Recipe.css';



export default function Recipe({ image, name, healthScore, diets }) {


    return (
        <div className="cont_recipe">
            <img id="img_rec" src={image} alt='recipe' />
            <h2 id="name_rec">{name}</h2>
            <p id="sco_rec">Health Score: {healthScore} </p>
            <p id="diet_rec">{ diets.length === 0 ? 'Recipes without diets' : diets.every(e => typeof e !== 'string') ? diets?.map(d => d.name + ' | ') : diets.map(d => d + ' | ') }</p>
        </div>
    )

}

//diets.every(e => typeof e !== 'string') ? diets?.map(d => d.name + ' | ') : diets.length === 0 ? 'Recipe without diets' : diets.map(d => d + ' | ')}