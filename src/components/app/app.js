import React, { Component } from 'react';
//import logo from './logo.svg';
import './app.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name: 'J', artist: 'J', album: 'J', id: 1}, {name: 'M', artist: 'M', album: 'M', id: 2}],
      playlistName: 'test',
      playlistTracks: [{name: 'J', artist: 'J', album: 'J', id: 1}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack (track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id !== track.id)) {
      this.setState({
        playlistTracks: this.state.playlistTracks.push(track)
      });
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
    const trackURIs = [];
  }

  search (term) {
    console.log(term);
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
