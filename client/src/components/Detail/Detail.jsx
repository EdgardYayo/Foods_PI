import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { cleanDetail, deleteRecipe, getDetail, removeFavorite } from "../../redux/actions";
import './Detail.css'
import swa from 'sweetalert';





export default function Detail(props) {
    const { id } = props.match.params;

    const dispatch = useDispatch()
    const detail = useSelector(state => state.detail)
    console.log(detail);

    const history = useHistory()

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(cleanDetail(dispatch))
        }
    }, [dispatch, id])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteRecipe(id))
        dispatch(removeFavorite(id))
        history.push('/home')
        swa("The recipe has been deleted", "", "success")
    }

    return (
        <div className="cont_detail">
            <p id="p_det"> 🥘Every recipe is a universe of flavors ෴ 🌮</p>
            <img id='img_det' src={detail.image} alt='recipe' />
            <h2 id="name_det">{detail.name}</h2>
            <div id="sec_det">
                <p><strong>Diets:</strong> {detail.diets?.every(e => typeof e === 'string') ? detail.diets?.map(d => d + '🥗 ') : detail.diets?.map(d => d.name + '🥗 ' )}</p>
                <p><strong>Health Score:</strong> {detail.healthScore}</p>
                <p><strong>Summary:</strong> {detail.summary?.replace(/(<([^>]+)>)/gi, "")}</p>
                <ul id="list_det"><strong>Steps:</strong>{Array.isArray(detail.steps) ? detail.steps?.map(s =>
                    <li key={s.id}>{s.number}. {s.step}🍽️</li>
                ) : detail.steps || <span>
                    No steps 🍽️
                </span>
                }</ul>
            </div>

            <Link to='/home'>
                <button id="but_det">Back Home</button>
            </Link>
                { detail.createdInDb ?  <button id="del_det" onClick={() => handleDelete(id)}>Delete</button> : null }

        </div>
    )
}