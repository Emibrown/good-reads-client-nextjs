import React, { useState, useCallback } from "react";

function StarRating({max, value, disabled = true, starClass, onChange}){  
    const [rating, setRating] = useState(value);
    const [hover, setHover] = useState(0);

    const onClick = useCallback((index) => {
        setRating(index)
        onChange(index)
    }, [onChange])

    return (
        <div className="star-rating">
            {[...Array(max)].map((star, index) => {
            index += 1;
            return (    
                <button
                    type="button"
                    key={index}
                    disabled={disabled}
                    className={`${index <= (hover || rating) ? "text-[#d67b19]" : "text-[gray]"}`}
                    onClick={() => onClick(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                >
                    <span className={starClass}>&#9733;</span>     
                </button>   
            )})}
        </div>
    );
};

export default StarRating;