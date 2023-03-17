import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";


export default function Landing(){

    useEffect(() => {
        window.scrollTo(0, 200)
    }, [])

    return (
        <div className="cont_land">
            <header id="head_land">
                <p>Project made by: <strong>Edgard A. Pazos I.</strong></p>
                <span>Made with: <strong>JS, React, Redux, HTML, CSS, Express, Sequelize, Postgres</strong></span>
            </header>
            <img id='img_land'src="https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="food"/>
            <Link to='/home'>
                <button id="but_land">𝔻𝕚𝕤𝕔𝕠𝕧𝕖𝕣 𝕪𝕠𝕦𝕣 𝕚𝕟𝕤𝕚𝕕𝕖 𝕔𝕙𝕖𝕗</button>
            </Link>
            <p id="beat">💗</p>

            <Link to='/comments'>
                <button id="link_comment">Comment and Rate</button>
            </Link>
        </div>
    )
}