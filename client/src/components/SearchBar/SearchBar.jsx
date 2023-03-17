import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../redux/actions";
import "./SearchBar.css";




export default function SearchBar({setCurrentPage}) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getName(name))
        setName('')
        setCurrentPage(1)

    }

    const handleSearch = (e) => {
        e.preventDefault()
        setName(e.target.value)
        setCurrentPage(1)
    }

    return (
        <form id="Bar" onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => handleSearch(e)} value={name} placeholder="Looking for Food..." />
            <button type="submit">Search</button>
        </form>
    )
}