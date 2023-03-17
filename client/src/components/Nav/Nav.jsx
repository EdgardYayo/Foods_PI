import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByCreated, filterByDiet, filterLessThan, getDiets, orderAlpha, orderScore } from "../../redux/actions";
import "./Nav.css";


export default function Nav({ setCurrentPage, setOrder }) {

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)


    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    const handleFilterDiets = (e) => {
        e.preventDefault()
        dispatch(filterByDiet(e.target.value))
        setCurrentPage(1);
    }

    const handleFilterCreated = (e) => {
        e.preventDefault()
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1);
    }

    const handleOrderScore = (e) => {
        e.preventDefault()
        dispatch(orderScore(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(1)
    }

    const handleOrderAlpha = (e) => {
        e.preventDefault()
        dispatch(orderAlpha(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(1)
    }


    return (
        <nav className="nav_nav">
            <Link to='/fav'>
                <button id="but_fav-nav">Fav⭐</button>
            </Link>
            <select onChange={(e) => handleFilterCreated(e)}>
                <option value='all'>All</option>
                <option value='api'>Api</option>
                <option value='created'>Created</option>
                <option value='fav'>Fav</option>
            </select>
            <select onChange={(e) => handleOrderScore(e)}>
                <option value='all'>Health Score</option>
                <option value='high'>High</option>
                <option value='low'>Low</option>
            </select>
            <select onChange={(e) => handleOrderAlpha(e)}>
                <option value='all'>Alphabetically</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>
            <select onChange={(e) => handleFilterDiets(e)}>
                <option value='All'>All</option>
                {diets && diets.map(d => {
                    return (
                        <option key={d.id} value={d.name}>{d.name}</option>
                    )
                })}

            </select>
        </nav>
    )
}