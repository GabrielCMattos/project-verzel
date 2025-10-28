// src/components/MovieCard.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { apiFetch } from "../services/api";
import "./MovieCard.css";

const IMAGE_BASE = import.meta.env.VITE_IMG;

export default function MovieCard({
  movie,
  showLink = true,
  cardType = "default",
}) {
  // Normaliza o objeto do filme pra evitar campos ausentes
  const m = useMemo(
    () => ({
      id: Number(movie?.id),
      title: movie?.title ?? movie?.name ?? "Sem título",
      vote_average: Number(movie?.vote_average ?? 0),
      poster_path:
        movie?.poster_path ??
        movie?.poster ??
        "/no-image.png", // sua imagem placeholder
    }),
    [movie]
  );

  const [isFav, setIsFav] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  // Checa se este filme já está favoritado
  useEffect(() => {
    let cancelled = false;
    async function checkFav() {
      if (!user?.id || !m.id) {
        setIsFav(false);
        return;
      }
      try {
        const list = await apiFetch(`/favorites/${user.id}`);
        const found = Array.isArray(list)
          ? list.some((f) => Number(f.movieId) === Number(m.id))
          : false;
        if (!cancelled) setIsFav(found);
      } catch {
        if (!cancelled) setIsFav(false);
      }
    }
    checkFav();
    return () => {
      cancelled = true;
    };
  }, [user?.id, m.id]);

  // Alterna favorito
  async function toggleFavorite(e) {
    e?.stopPropagation?.();
    e?.preventDefault?.();

    if (!user?.id) {
      alert("Faça login para favoritar filmes.");
      return;
    }
    if (!m.id) return;

    // Otimista
    const prev = isFav;
    setIsFav(!prev);
    setLoadingFav(true);
    try {
      const resp = await apiFetch(`/favorites/toggle`, {
        method: "POST",
        body: JSON.stringify({
          movieId: Number(m.id),
          title: m.title,
          poster: m.poster_path, // salve só o path; no front você prefixa
        }),
      });

      // Se o backend retornar mensagem de remoção, garantimos false; senão true
      if (resp?.message?.toLowerCase?.().includes("removido")) {
        setIsFav(false);
      } else {
        setIsFav(true);
      }
    } catch {
      // Reverte em caso de erro
      setIsFav(prev);
      alert("Erro ao favoritar filme.");
    } finally {
      setLoadingFav(false);
    }
  }

  const rootClass = `card ${cardType === "carousel" ? "card-carousel" : "card-default"}`;

  return (
    <div className={rootClass}>
      <div className="card-poster">
        {/* Botão de favorito no canto do poster */}
        <button
          className={`fav-btn ${isFav ? "active" : ""}`}
          title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={toggleFavorite}
          disabled={loadingFav}
          aria-pressed={isFav}
        >
          {isFav ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />}
        </button>

        <img
          src={m.poster_path?.startsWith("http") ? m.poster_path : `${IMAGE_BASE}${m.poster_path}`}
          alt={m.title}
          loading="lazy"
        />
      </div>

      {/* Overlay (igual no grid e no carrossel) */}
      <div className="card-overlay">
        <h2>{m.title}</h2>
        <p>
          <FaStar /> {m.vote_average.toFixed(1)}
        </p>
        {showLink && (
          <Link to={`/movie/${m.id}`} className="btn btn-details">
            Detalhes
          </Link>
        )}
      </div>
    </div>
  );
}
