import React, { useState } from "react";
import { useEffect } from "react";
import { addFavorite, getRecipes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import Paged from "../Paged/Paged";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css';
import { Link } from "react-router-dom";
import NotFound from "../NotFound/NotFound";



export default function Home() {

    const dispatch = useDispatch();
    const all = useSelector(state => state.recipes);
    const fav = useSelector(state => state.favorites);
    console.log(all);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const lastIndex = currentPage * recipesPerPage;
    const firstIndex = lastIndex - recipesPerPage;
    const currentRecipes = all.slice(firstIndex, lastIndex);

    const [order, setOrder] = useState('');


    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getRecipes())
    }


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [dispatch])

    const handleFav = (props) => {
        if (fav.some(e => e.id === props.id)) {
            return null
        } else {
            dispatch(addFavorite(props))
        }

        //else if (!fav.includes(props))
    }

    return (
        <main className="cont_home">
            <Link to='/form'>
                <button id="create_home">Create🥗</button>
            </Link>
            <button id='down' onClick={() => window.scrollTo(0, 460)}>⇊</button>
            <p id="p_hom">There is a chef inside of everyone, discover your own...</p>
            <p id="fruit_hom">🍛🥘🌮🍠🍣🍝🍗</p>
            <div id='nav_hom'>
                <Nav setCurrentPage={setCurrentPage} setOrder={setOrder} />
                <Paged
                    recipesPerPage={recipesPerPage}
                    paged={paged}
                    all={all.length}
                />
                <SearchBar setCurrentPage={setCurrentPage} />
            </div>
            <button id="refresh" onClick={(e) => handleClick(e)}>🔄</button>
            <Link to='/'>
                <button id="but_back">🔙</button>
            </Link>
            <section className="recipes_home">
                {currentRecipes.length ? currentRecipes.map(r => {
                    return (
                        <div id="cont_card">
                            <button id="fav_hom-but" onClick={() => handleFav({
                                id: r.id,
                                name: r.name,
                                image: r.image,
                                healthScore: r.healthScore,
                                diets: r.diets
                            })}>⭐</button>
                            <Recipe
                                key={r.id}
                                image={r.image}
                                name={r.name}
                                healthScore={r.healthScore}
                                diets={r.diets}
                            />
                            <Link to={'/detail/' + r.id}>
                                <button id="but_hom">Details</button>
                            </Link>
                        </div>

                    )
                }) : <div id='nf_home'><NotFound /></div>}
            </section>
        </main>
    )
}