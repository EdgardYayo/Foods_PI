import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addComment } from "../../redux/actions";
import "./Comments.css";
import swa from 'sweetalert';




export default function Comments() {

    const dispatch = useDispatch();
    const allComments = useSelector(state => state.comments)

    const [input, setInput] = useState({
        comment: '',
        rating: 0
    })

    const [errors, setErrors] = useState({})


    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const validate = (input) => {
        let errors = {}

        if (!input.comment) {
            errors.comment = 'comment is required';
        }

        if (!input.rating) {
            errors.rating = 'rating is required, between(1 - 10)';
        }

        return errors;
    }


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!errors.comment && !errors.rating && input.comment && input.rating) {
            dispatch(addComment(input))
            setInput({
                comment: '',
                rating: 0
            })

            swa('Thanks for the comments and the rating', '💌', 'success')
        } else {
            swa('You must comment and rate to submit', 'please fill all the form', 'error')
        }
    }


    return (
        <div className="cont_comt">
            <h1 id="h1_comt">Comment and Rate the page💌</h1>
            <form className="form_comt" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Comments, Suggestions or Complaints:</label>
                    <textarea value={input.comment} name='comment' onChange={(e) => handleChange(e)} />
                    <p>{errors.comment}</p>
                </div>
                <div>
                    <label>Rate the Page ({parseInt(input.rating) < 6 ? input.rating + ' 👎' : input.rating + ' 👍'})</label>
                    <input type='range' min='1' max='10' step='0.1' value={input.rating} name='rating' onChange={(e) => handleChange(e)} />
                    <p>{errors.rating}</p>
                </div>

                <div id="div_but">
                    <button type='submit' id="div_but" className="butto">Submit</button>
                    <Link to='/'>
                        <button id="div_but" className="butto">Back</button>
                    </Link>
                </div>

                <img id="img_comt" src="https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="food"/>
            </form>
            <section className="sect_comt">
                {allComments.length ? allComments?.map(c => {
                    return (
                        <div id="div_comt">
                            <h3>Your Comment is: {c.comment}</h3>
                            <h4>Your rate of the page is: {parseInt(c.rating, 10) < 6 ? c.rating + '😔': c.rating + '❤️'}</h4>
                        </div>
                    )
                }) : <p id="p_comt">There are no comments 😭</p>}

            </section>
        </div>
    )
}