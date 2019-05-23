import React from 'react';
import './../landing.css';


const Landing = () => (
    <section className="landing">
        <h1 className="hero-title">Turn the music up!</h1>

        <div class="row">
            <div class="column">
                <img src="/assets/images/landing_icons/headphones.png" alt="Headphones Icon"></img>
                <h2>Choose Your Music</h2>
                <p>The world is full of music...</p>
                <p>Why listen to music that someone else chose?</p>
            </div>
            <div class="column">
                <img src="/assets/images/landing_icons/speaker.png" alt="Speaker Icon"></img>
                <h2>Unlimited Streaming, Ad-Free</h2>
                <p>No arbitrary limits.</p>
                <p>No distrations.</p>
            </div>
            <div class="column">
                <img src="/assets/images/landing_icons/smartphone.png" alt="Smartphone Icon"></img>
                <h2>Mobile Enabled</h2>
                <p>Listen to your music on the go.</p>
                <p>This streaming service is available on all mobile platforms.</p>
            </div>
        </div>
    </section>
);


export default Landing;