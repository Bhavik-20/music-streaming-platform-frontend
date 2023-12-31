import React, { useState, useEffect } from "react";
import {
	fetchTrackDetails,
	fetchArtistAlbums,
} from "../spotify-hook/spotifyApi";
import "./album-details.css";
import { Container, Row, Card } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaChevronLeft } from "react-icons/fa";
import { likeSongThunk, getLikedSongsThunk } from "../services/song-thunk";
import { useCookies } from "react-cookie";
import Nav from "../nav-bar/Nav";
import Musify from "../nav-bar/Musify";

const TrackDetails = () => {
	const { likedSongs } = useSelector((state) => state.songs);
	const [likedSongsState, setLikedSongsState] = useState(likedSongs);
	const [track, setTrack] = useState();
	const [albums, setAlbums] = useState([]);
	const [isLiked, setIsLiked] = useState(likedSongsState.includes(track?.id));
	const [currentUserCookies, setCurrentUserCookies] = useCookies([
		"currentUserId",
	]);

	const { trackID } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const msToMinSec = (milliseconds) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
		return formattedTime;
	  }

	const likeSong = async () => {
		const currentUserId = currentUserCookies.currentUserId;
		const { payload } = await dispatch(
			likeSongThunk({ currentUserId, songId: track.id })
		);
		setIsLiked(payload.includes(track.id));
	};

	const getLikedSongs = async () => {
		if (currentUserCookies.currentUserId !== undefined && trackID) {
			const currentUserId = currentUserCookies.currentUserId;
			const { payload } = await dispatch(getLikedSongsThunk(currentUserId));
			console.log("Liked Songs: ", payload, payload.includes(trackID));
			setLikedSongsState(payload);
			setIsLiked(payload.includes(trackID));
		}
	};

	const fetchTrackData = async () => {
		const trackData = await fetchTrackDetails(trackID);
		setTrack(trackData);
		if (trackData && trackData.artists) {
			const albumsData = await fetchArtistAlbums(trackData.artists[0].id);
			console.log("fetch albums: ", albumsData);
			setAlbums(albumsData);
		} else {
			console.log("no track");
		}
	};

	useEffect(() => {
		fetchTrackData();
		getLikedSongs();
	}, []);

	return (
		<div className="container-fluid bg-black mt-3">
			<div className="row">
				<div className="col-2">
					<Musify />
					<Nav />
				</div>
				<div className="col-10">
					<div>
						<div className="col-2">
							<FaChevronLeft
								className="section"
								style={{
									height: "40px",
									margin: "15px",
								}}
								onClick={(e) => {
									e.preventDefault();
									navigate(-1);
								}}
							/>
						</div>
						<div className="centered-container">
							{track && (
								<>
									<div id="album-info">
										<div className="album-details col">
											Track <br />
											<h1 className="song-title">{track.name}</h1>
											<div className="row">
												<div className="col">
													{track.artists.map((artist, i) => (
														<React.Fragment key={i}>
															{i > 0 && ", "}
															<b>{artist.name}</b>
														</React.Fragment>
													))}
												</div>
												<div className="col">
													{"Duration: " + msToMinSec(track.duration_ms) + " mins"}
												</div>
												<div className="col">
													<button
														style={{
															background: "black",
															color: "white",
															border: "none",
														}}
														onClick={
															currentUserCookies.currentUserId === undefined
																? () => navigate("/login")
																: likeSong
														}>
														{isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="album-details">
										<h3>More by {track.artists[0].name}</h3>
										<Container style={{ marginTop: "10px" }}>
											<Row className="mx-2 row">
												{albums.slice(0, 10).map((album, i) => {
													return (
														<Link
															className="col-lg-2 col-md-3 col-sm-4 col-6"
															to={`/albums/${album.id}`}
															style={{
																textDecoration: "none",
																color: "inherit",
															}}>
															<Card
																style={{
																	margin: "5px",
																}}
																className="card">
																<Card.Img src={album.images[0].url} />
																<Card.Body>
																	<Card.Title
																	style={{
																		fontSize: "14px",
																		whiteSpace: "nowrap",
																		overflow: "hidden",
																		textOverflow: "clip"
																	}} >{album.name} </Card.Title>
																</Card.Body>
															</Card>
														</Link>
													);
												})}
											</Row>
										</Container>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrackDetails;
