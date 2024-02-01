import React from "react";

function FavPoke({ fav }) {
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {fav?.map((data, idx) => (
                <div key={idx}>
                    <h3>{data.name}</h3>
                    <img src={data?.sprites?.other?.home.front_default} alt="Favorite pokemon" />
                </div>
            ))}
        </div>
    )
}

export default FavPoke