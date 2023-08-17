import { Card, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchFeaturedPlaylists,
  fetchNewReleases,
} from "../../spotify-hook/spotifyApi";

const Trending = () => {
  const [playlists, setPlaylists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistData = await fetchFeaturedPlaylists();
        console.log("Fetched album items:", playlistData); // Add this line
        setPlaylists(playlistData.playlists.items.slice(0, 5));
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);


  return (
    <div>
      <Row className="mx-2 row row-cols-6">
        {playlists.map((playlist, i) => {
          return (
              <Card
                
                className="card"
                onClick={(e) => {
                    e.preventDefault();
                      navigate(`/playlists/${playlist.id}`);
                  
                  }}
              >
                <Card.Img src={playlist.images[0].url} />
                <Card.Body>
                  <Card.Title >{playlist.name} </Card.Title>
                </Card.Body>
              </Card>
          );
        })}
      </Row>
    </div>
  );
};

export default Trending;
