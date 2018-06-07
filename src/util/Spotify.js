let userAccessToken = '';
const clientID = '77e62346179d4e19ac0dc7c98873ff2f';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken: function () {
    if (userAccessToken) {
      return userAccessToken;
    }

    const url = window.location.href;

    const accessToken = url.match(/access_token=([^&]*)/);
    const expiresIn = url.match(/expires_in=([^&]*)/);

    if(accessToken && expiresIn) {
      userAccessToken = accessToken[1];
      const expirationTime = Number(expiresIn[1]) * 1000;
      window.setTimeout(() => {
        userAccessToken = '';
      }, expirationTime);
      window.history.pushState('For Access Token', null, '/');
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map(currTrack => {
        return {
          id: currTrack.id,
          name: currTrack.name,
          artist: currTrack.artists[0].name,
          album: currTrack.album.name,
          uri: currTrack.uri
        };
      })
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    const accessToken = this.getAccessToken();

    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => jsonResponse.id)
    .then(userId => {
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({name: playlistName}),
        method: 'POST'
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const playlistId = jsonResponse.id;
        const addSongsURL = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
        fetch(addSongsURL, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({name: trackURIs}),
          method: 'POST'
        });
      });
    });
  }

};

export default Spotify;
