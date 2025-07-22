import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpotify, FaMusic, FaPlay, FaPause, FaHeart, FaSpotify as FaSpotifyIcon } from 'react-icons/fa';
import { fadeIn, slideInLeft, slideInRight, float } from '../../utils/animations';

// Sample playlist data - replace with your actual Spotify playlist
const playlistData = {
  title: 'Our Love Story',
  description: 'Songs that remind me of us and our journey together.',
  spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX50QitC6OqDk?utm_source=generator',
  tracks: [
    {
      id: 1,
      title: 'Perfect',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      duration: '4:23'
    },
    {
      id: 2,
      title: 'All of Me',
      artist: 'John Legend',
      album: 'Love in the Future',
      duration: '4:30'
    },
    {
      id: 3,
      title: 'A Thousand Years',
      artist: 'Christina Perri',
      album: 'The Twilight Saga: Breaking Dawn - Part 1',
      duration: '4:45'
    },
    {
      id: 4,
      title: 'Thinking Out Loud',
      artist: 'Ed Sheeran',
      album: 'x (Multiply)',
      duration: '4:41'
    },
    {
      id: 5,
      title: 'Perfect Duet',
      artist: 'Ed Sheeran, Beyoncé',
      album: '÷ (Divide)',
      duration: '4:19'
    }
  ]
};

const Playlist = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showFullPlaylist, setShowFullPlaylist] = useState(false);
  
  // Auto-play the first track after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Play a specific track
  const playTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };
  
  // Toggle full playlist view
  const toggleFullPlaylist = () => {
    setShowFullPlaylist(!showFullPlaylist);
  };
  
  return (
    <section className="playlist-section" id="playlist">
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.span 
            className="section-subtitle"
            variants={fadeIn}
          >
            Our Soundtrack
          </motion.span>
          <motion.h2 
            className="section-title"
            variants={slideInLeft}
          >
            Our Playlist
          </motion.h2>
          <motion.div 
            className="section-divider"
            variants={slideInRight}
          >
            <FaMusic className="music-icon" />
          </motion.div>
        </motion.div>
        
        <div className="playlist-container">
          <motion.div 
            className="now-playing"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="album-art">
              <div className="vinyl">
                <div className="vinyl-inner">
                  <div className="vinyl-center"></div>
                </div>
              </div>
              <div className="album-cover">
                <FaSpotifyIcon className="spotify-icon" />
                <div className="album-overlay">
                  <button 
                    className={`play-button ${isPlaying ? 'playing' : ''}`}
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="track-info">
              <h3 className="track-title">{playlistData.tracks[currentTrack].title}</h3>
              <p className="track-artist">{playlistData.tracks[currentTrack].artist}</p>
              <p className="track-album">{playlistData.tracks[currentTrack].album}</p>
              
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: isPlaying ? '70%' : '0%' }}
                ></div>
              </div>
              
              <div className="track-controls">
                <span className="current-time">0:00</span>
                <span className="duration">{playlistData.tracks[currentTrack].duration}</span>
              </div>
              
              <div className="spotify-badge">
                <FaSpotify />
                <span>Listen on Spotify</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="playlist-embed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="embed-header">
              <h3>{playlistData.title}</h3>
              <p>{playlistData.description}</p>
            </div>
            
            <div className="spotify-embed">
              <iframe
                src={playlistData.spotifyEmbedUrl}
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Our Love Story Playlist"
              ></iframe>
            </div>
            
            <button 
              className="toggle-playlist-btn"
              onClick={toggleFullPlaylist}
            >
              {showFullPlaylist ? 'Hide Tracklist' : 'Show Full Tracklist'}
              <span className={`arrow ${showFullPlaylist ? 'up' : 'down'}`}>▼</span>
            </button>
            
            <AnimatePresence>
              {showFullPlaylist && (
                <motion.div 
                  className="tracklist"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="tracklist-header">
                    <span className="track-number">#</span>
                    <span className="track-title">Title</span>
                    <span className="track-album">Album</span>
                    <span className="track-duration">Duration</span>
                  </div>
                  
                  <div className="tracklist-tracks">
                    {playlistData.tracks.map((track, index) => (
                      <div 
                        key={track.id}
                        className={`track ${currentTrack === index ? 'active' : ''}`}
                        onClick={() => playTrack(index)}
                      >
                        <div className="track-number">
                          {currentTrack === index ? (
                            <FaMusic className="playing-icon" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div className="track-title">
                          <span className="title">{track.title}</span>
                          <span className="artist">{track.artist}</span>
                        </div>
                        <div className="track-album">{track.album}</div>
                        <div className="track-duration">
                          <span>{track.duration}</span>
                          <button className="favorite-btn" aria-label="Add to favorites">
                            <FaHeart className="heart-icon" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {/* Floating music notes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`music-note note-${i + 1}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -100],
            x: [0, (Math.random() - 0.5) * 100],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        >
          {['♪', '♫', '♩', '♬', '♭', '♮', '♯', '♪'][i % 8]}
        </motion.div>
      ))}
      
      <style jsx>{`
        .playlist-section {
          position: relative;
          background: linear-gradient(135deg, #f0f9f0 0%, #fff0f5 100%);
          padding: 8rem 0;
          overflow: hidden;
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 6rem;
        }
        
        .section-subtitle {
          display: block;
          font-size: 1.8rem;
          color: var(--color-pink);
          margin-bottom: 1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .section-title {
          font-size: 4.2rem;
          color: var(--color-pink-dark);
          margin-bottom: 2rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .section-divider {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .music-icon {
          color: var(--color-pink);
          font-size: 2.4rem;
          animation: pulse 2s infinite;
        }
        
        .playlist-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }
        
        .now-playing {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          background: white;
          border-radius: 12px;
          padding: 3rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
        }
        
        .now-playing::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: linear-gradient(90deg, #1DB954, #4CC9F0, #F15BB5, #FF9E00);
        }
        
        .album-art {
          position: relative;
          width: 250px;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .vinyl {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #111, #333);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: ${isPlaying ? 'spin 20s linear infinite' : 'none'};
          z-index: 1;
        }
        
        .vinyl-inner {
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, #444, #111);
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .vinyl-center {
          width: 20px;
          height: 20px;
          background: #1DB954;
          border-radius: 50%;
          border: 2px solid white;
          z-index: 2;
        }
        
        .album-cover {
          position: absolute;
          width: 70%;
          height: 70%;
          background: linear-gradient(135deg, #1DB954, #4CC9F0);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 4rem;
          transform: translateX(40%);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          z-index: 2;
        }
        
        .album-cover:hover {
          transform: translateX(40%) scale(1.05);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .spotify-icon {
          font-size: 4rem;
          color: white;
        }
        
        .album-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }
        
        .album-cover:hover .album-overlay {
          opacity: 1;
        }
        
        .play-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #1DB954;
          border: none;
          color: white;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(29, 185, 84, 0.4);
        }
        
        .play-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(29, 185, 84, 0.6);
        }
        
        .play-button.playing {
          background: #F15BB5;
          box-shadow: 0 4px 15px rgba(241, 91, 181, 0.4);
        }
        
        .play-button.playing:hover {
          box-shadow: 0 6px 20px rgba(241, 91, 181, 0.6);
        }
        
        .track-info {
          text-align: center;
          width: 100%;
          max-width: 500px;
        }
        
        .track-title {
          font-size: 2.4rem;
          color: var(--color-pink-dark);
          margin-bottom: 0.5rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .track-artist {
          font-size: 1.6rem;
          color: var(--color-text-secondary);
          margin-bottom: 0.5rem;
        }
        
        .track-album {
          font-size: 1.4rem;
          color: var(--color-text-light);
          margin-bottom: 2rem;
          font-style: italic;
        }
        
        .progress-bar {
          width: 100%;
          height: 4px;
          background: #eee;
          border-radius: 2px;
          margin: 1.5rem 0;
          overflow: hidden;
        }
        
        .progress {
          height: 100%;
          background: var(--color-pink);
          border-radius: 2px;
          transition: width 0.1s linear;
        }
        
        .track-controls {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          color: var(--color-text-light);
          margin-bottom: 2rem;
        }
        
        .spotify-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: #1DB954;
          color: white;
          padding: 0.8rem 1.6rem;
          border-radius: 50px;
          font-size: 1.4rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }
        
        .spotify-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(29, 185, 84, 0.3);
        }
        
        .playlist-embed {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }
        
        .embed-header {
          padding: 2.5rem 3rem;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .embed-header h3 {
          font-size: 2.2rem;
          color: var(--color-pink-dark);
          margin-bottom: 0.5rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .embed-header p {
          font-size: 1.4rem;
          color: var(--color-text-secondary);
          margin: 0;
        }
        
        .spotify-embed {
          padding: 0 2rem 2rem;
        }
        
        .toggle-playlist-btn {
          width: 100%;
          padding: 1.5rem;
          background: #f9f9f9;
          border: none;
          border-top: 1px solid #f0f0f0;
          color: var(--color-pink-dark);
          font-size: 1.4rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .toggle-playlist-btn:hover {
          background: #f5f5f5;
          color: var(--color-pink);
        }
        
        .arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        
        .arrow.up {
          transform: rotate(180deg);
        }
        
        .tracklist {
          overflow: hidden;
        }
        
        .tracklist-header {
          display: grid;
          grid-template-columns: 50px 3fr 2fr 80px;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
          background: #f9f9f9;
          border-bottom: 1px solid #f0f0f0;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-text-light);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .tracklist-tracks {
          max-height: 400px;
          overflow-y: auto;
        }
        
        .track {
          display: grid;
          grid-template-columns: 50px 3fr 2fr 80px;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .track:hover {
          background: #f9f9f9;
        }
        
        .track.active {
          background: #fff5f7;
          border-left: 3px solid var(--color-pink);
        }
        
        .track-number {
          display: flex;
          align-items: center;
          color: var(--color-text-light);
          font-size: 1.4rem;
        }
        
        .playing-icon {
          color: var(--color-pink);
          animation: pulse 1.5s infinite;
        }
        
        .track-title {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .track-title .title {
          font-weight: 500;
          color: var(--color-text-primary);
          margin-bottom: 0.3rem;
        }
        
        .track-title .artist {
          font-size: 1.2rem;
          color: var(--color-text-light);
        }
        
        .tracklist .track-album {
          display: flex;
          align-items: center;
          font-size: 1.3rem;
          color: var(--color-text-secondary);
          margin: 0;
          font-style: normal;
        }
        
        .track-duration {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.3rem;
          color: var(--color-text-light);
        }
        
        .favorite-btn {
          background: none;
          border: none;
          color: #ddd;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .favorite-btn:hover {
          color: var(--color-pink);
          background: rgba(255, 107, 157, 0.1);
        }
        
        .track.active .favorite-btn {
          color: var(--color-pink);
        }
        
        .heart-icon {
          font-size: 1.2rem;
        }
        
        /* Music notes animation */
        .music-note {
          position: absolute;
          color: var(--color-pink);
          font-size: 2.4rem;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          filter: drop-shadow(0 0 5px rgba(255, 107, 157, 0.5));
        }
        
        .note-1 { top: 10%; left: 10%; }
        .note-2 { top: 20%; right: 15%; }
        .note-3 { top: 30%; left: 15%; }
        .note-4 { bottom: 25%; right: 10%; }
        .note-5 { bottom: 15%; left: 20%; }
        .note-6 { top: 25%; right: 25%; }
        .note-7 { bottom: 20%; left: 10%; }
        .note-8 { top: 15%; right: 20%; }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @media (min-width: 992px) {
          .now-playing {
            flex-direction: row;
            justify-content: space-between;
            padding: 4rem;
          }
          
          .album-cover {
            width: 200px;
            height: 200px;
            transform: translateX(0);
          }
          
          .album-cover:hover {
            transform: scale(1.05);
          }
          
          .track-info {
            text-align: left;
            padding-left: 2rem;
            border-left: 1px solid #f0f0f0;
          }
          
          .playlist-container {
            flex-direction: row;
          }
          
          .now-playing {
            flex: 1;
          }
          
          .playlist-embed {
            flex: 1;
          }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 3.6rem;
          }
          
          .track-title {
            font-size: 2rem;
          }
          
          .track-artist {
            font-size: 1.4rem;
          }
          
          .track-album {
            font-size: 1.3rem;
          }
          
          .tracklist-header,
          .track {
            grid-template-columns: 40px 2fr 1fr 70px;
            gap: 1rem;
            padding: 1.2rem 1.5rem;
          }
          
          .track-title .title {
            font-size: 1.4rem;
          }
          
          .track-title .artist {
            font-size: 1.1rem;
          }
          
          .tracklist .track-album,
          .track-duration {
            font-size: 1.2rem;
          }
        }
        
        @media (max-width: 576px) {
          .section-title {
            font-size: 3rem;
          }
          
          .now-playing {
            padding: 2rem;
          }
          
          .album-art {
            width: 200px;
            height: 200px;
          }
          
          .track-title {
            font-size: 1.8rem;
          }
          
          .tracklist-header,
          .track {
            grid-template-columns: 30px 2fr 1fr 40px;
            gap: 0.8rem;
            padding: 1rem;
          }
          
          .tracklist-header {
            display: none;
          }
          
          .track {
            grid-template-areas: 
              "number title title"
              ". artist duration";
            grid-template-columns: 30px 1fr 60px;
          }
          
          .track-number {
            grid-area: number;
          }
          
          .track-title {
            grid-area: title;
          }
          
          .track-artist {
            grid-area: artist;
          }
          
          .track-duration {
            grid-area: duration;
            justify-content: flex-end;
          }
          
          .tracklist .track-album {
            display: none;
          }
          
          .track-title .title {
            font-size: 1.4rem;
            margin-bottom: 0.2rem;
          }
          
          .track-title .artist {
            font-size: 1.1rem;
          }
          
          .track-duration {
            font-size: 1.1rem;
          }
          
          .favorite-btn {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Playlist;
