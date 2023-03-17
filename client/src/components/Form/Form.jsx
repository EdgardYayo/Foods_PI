import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../redux/actions";
import "./Form.css";
import swa from 'sweetalert';


export default function Form() {

    const dispatch = useDispatch();
    const allDiets = useSelector(state => state.diets);
    const history = useHistory()

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        steps: "",
        diets: [],
        image: ""
    })

    const validate = (input) => {
        let errors = {};

        if (!input.name || input.name?.length > 100 || !/^[a-z]+$/i.test(input.name)) {
            errors.name = "Name required, only letters, no numbers and less of 100 characters"
        }

        if (!input.summary || !/^[a-z]+$/i.test(input.name)) {
            errors.summary = "Summary is required, only letters are allowed"
        }

        if (input.healthScore < 1 || input.healthScore > 100  || !/^\d+$/.test(input.healthScore)) {
            errors.healthScore = "Health Score is required, only a number between 1-100"
        }

        if (!input.steps) {
            errors.steps = "Steps are required"
        }

        if (!input.image || !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
            errors.image = "Image are required, only a valid URL"
        }

        return errors;
    }


    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate ({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = (e) => {
        if (input.diets.includes(e.target.value)) {
            swa("You must choose different diets", "Please select other diet", "error")
        } else if (input.diets.length < 3) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
            e.target.value = "Select Diets"
        } else {
            swa("You can only choose at most 3 diets", "", "error")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (
            !errors.name &&
            !errors.summary &&
            !errors.healthScore &&
            !errors.steps &&
            !errors.image
        ) {
            dispatch(postRecipe(input))
            setInput({
                name: "",
                summary: "",
                healthScore: 0,
                steps: "",
                diets: [],
                image: ""
            })
            history.push("/home")
            swa("New recipe has been created", "Enjoy it...", "success")
        } else {
            swa("Error you must fill all the form", "Check the inputs", "error")
        }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== e)
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        setInput({
            name: "",
            summary: "",
            healthScore: 0,
            steps: "",
            diets: [],
            image: ""
        })
    }


    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0,250)
    },[dispatch])


    return (
        <div className="cont_div">
            <h1 id="h1_form">Create your own recipe</h1>
            <Link to='/home'>
                <button id="back_but-form">Back</button>
            </Link>
            <img  id='img_nav-form'src="https://images.pexels.com/photos/6004802/pexels-photo-6004802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='food'/>
            <p id="p_form">Become your own chef... And start making your own recipes</p>
            <form className="form_form" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                    <p>{errors.name}</p>
                </div>
                <div>
                    <label>Summary:</label>
                    <input type='text' value={input.summary} name='summary' onChange={(e) => handleChange(e)} />
                    <p>{errors.summary}</p>
                </div>
                <div>
                    <label>Health Score:</label>
                    <input id="health_inp-form" type='number' value={input.healthScore} name='healthScore' onChange={(e) => handleChange(e)} />
                    <p>{errors.healthScore}</p>
                </div>
                <div>
                    <label>Steps:</label>
                    <input type='text' value={input.steps} name='steps' onChange={(e) => handleChange(e)} />
                    <p>{errors.steps}</p>
                </div>
                <div>
                    <select onChange={(e) => handleSelect(e)}>
                        <option>Select Diets</option>
                        {allDiets && allDiets.map(d => {
                            return (
                                <option key={d.id} value={d.name}>{d.name}</option>
                            )
                        })}
                    </select>
                    {input.diets.map(d => {
                        return (
                            <p id="p-diets" key={d}>{d}<button id="del_form" onClick={() => handleDelete(d)}>✘</button></p>
                        )
                    })}
                </div>
                <div>
                    <label>Image:</label>
                    <input type='text' value={input.image} name='image' onChange={(e) => handleChange(e)} />
                    <p>{errors.image}</p>
                </div>
                <button id="but_reset" onClick={(e) => handleReset(e)}>Reset</button>
                <img id='img_form'src="https://cdn-prod.medicalnewstoday.com/content/images/hero/322/322336/322336_1100.jpg" alt='food'/>
                { input.name && input.summary && input.healthScore && input.steps && input.image && input.diets.length ? 
                    <button id='but_form' type="submit">Create Recipe</button> :
                    <p id="p_but-form">Fill all the form</p> }
            </form>
        </div>
    )
}

