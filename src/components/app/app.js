import React, { Component } from 'react';
//import logo from './logo.svg';
import './app.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const playlistTracksHolder = [...this.state.playlistTracks];
    if (playlistTracksHolder.indexOf(track) === -1) {
      playlistTracksHolder.push(track);
      this.setState({ playlistTracks: playlistTracksHolder });
    }
  }

  removeTrack (track) {
    const newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({
      playlistTracks: newPlaylist
    });
  }

  updatePlaylistName (name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist () {
    const playlistTracks = this.state.playlistTracks;
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({playlistName: 'My Playlist', playlistTracks: [] });
    });
  }

  search (term) {
    Spotify.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  render () {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
