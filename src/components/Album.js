import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        }
        );

        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            volume: 1.0,
            duration: album.songs[0].duration,
            isPlaying: false,
            isHovered: false,
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }
    
    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    }

    setHover(song) {
        this.setState({ isHovered: song });
    }

    unSetHover() {
        this.setState({ isHovered: false});
    }

    songDisplay(song, index) {
        if (
            (this.state.isPlaying && this.state.currentSong === song) || (this.state.isHovered === song && this.state.isPlaying && this.state.currentSong === song)
        ) {
            return <span className="ion-pause"/>;
        } else if (
            (!this.state.isPlaying && this.state.currentSong === song) || this.state.isHovered === song
        ) {
            return <span className="ion-play"/>;
        }
        return index + 1;
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex -1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex +1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ volume: newVolume });
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

  

    formatTime(seconds){
        if(seconds < 10){
          return parseInt((seconds % 3600) / 60) + ':' + '0' + parseInt((seconds % 3600) % 60);
        }
        else if(seconds === " "){
          return "-:--"
        }
        else
          return parseInt((seconds % 3600) / 60) + ':' + parseInt((seconds % 3600) % 60);
      }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            },
            volumeupdate: e => {
                this.setState({ volume: this.audioElement.volume});
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }   

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
       
    }

    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col group="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map((song, index) =>
                            <tr 
                                className="song" 
                                key={index} 
                                onClick={() => this.handleSongClick(song)}
                                onMouseEnter={() => this.setHover(song)}
                                onMouseLeave={() => this.unSetHover()}
                            >
                                <td className="song-number">{this.songDisplay(song, index)}</td>

                                <td className="song-title">{song.title}
                                </td>
                                <td className="song-duration">{song.duration}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <PlayerBar 
                    isPlaying={this.state.isPlaying} 
                    currentSong={this.state.currentSong} 
                    currentTime={this.state.currentTime}
                    currentVolume={this.audioElement.currentVolume}
                    length={this.audioElement.length}
                    duration={this.audioElement.duration}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    formatTime={this.formatTime}

                />
            </section>
        );
    }
}

export default Album;