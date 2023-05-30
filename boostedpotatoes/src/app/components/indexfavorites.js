import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { FavoriteContext } from "../context/FavoritesContext"; 
const Carousel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLogged } = useContext(AuthContext); 
  const userIdFromCookie = Cookies.get("userId");
  const { favoriteChanged, setFavoriteChanged } = useContext(FavoriteContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userIdFromCookie}`,
          {
            cache: "no-cache",
          }
        );
        setData(response.data[0].favorites);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLogged) {
      fetchData();
      if (favoriteChanged) {
        setFavoriteChanged(false);
      }
    } else {
      setLoading(false);
    }
  }, [userIdFromCookie, isLogged, favoriteChanged, setFavoriteChanged]);

  return (
    <div className="carouselcontainer">
      {loading ? (
        <button className="btn loading text-center">Loading</button>
      ) : !isLogged ? (
        <div className="text-center">
          You must be connected to select your favorites movies
        </div>
      ) : data && data.length > 0 ? (
        <div className="carousel rounded-box m-5">
          {data.map((movie) => (
            <div
              className="carousel-item mr-2 w-48 hover:scale-105 transition duration-500"
              key={movie._id}
            >
              <Link href={`/movieunit/${movie._id}`}>
                <img src={movie.poster_path} alt="Burger" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">No favorite movies yet.</div>
      )}
    </div>
  );
};

export default Carousel;
