// src/SpotifyAPI.js
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
const redirectUri = 'http://localhost:3000';
const clientId = 'c4cdfc316afc45aebeffea58959ac714'; // Replace this with your actual Spotify application's client_id

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true&scope=user-read-private%20user-modify-playback-state%20user-read-playback-state%20streaming`;

export const initializeSpotifyApi = (token) => {
  if (token) {
    spotifyApi.setAccessToken(token);
  }
};

export const searchTracks = async (searchQuery) => {
    try {
      const response = await spotifyApi.searchTracks(searchQuery);
      return response.tracks.items;
    } catch (error) {
      console.error('Error searching for tracks:', error);
      return [];
    }
  };
  
  export const playTrack = async (trackUri) => {
    try {
        console.log(trackUri);
      await spotifyApi.play({ uris: [trackUri] });
    } catch (error) {
      console.error('Error playing the track:', error);
    }
  };

export default spotifyApi;
