import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function LikePoke() {
    const [like, setLike] = useState(false);

    const toggleLike = () => {
        setLike((prevLike) => !prevLike);
    };

    return (
        <div>
            {like ? (
                <FaHeart color="red" onClick={toggleLike} />
            ) : (
                <FaRegHeart onClick={toggleLike} />
            )}
        </div>
    );
}

export default LikePoke;
