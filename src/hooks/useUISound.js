import { useState, useEffect, useRef } from 'react';

const SOUND_PATH = '/sound/mixkit-sci-fi-click-900.wav';

export const useUISound = () => {
    // Track if the user has interacted with the page to avoid "Autoplay" errors on hover
    const [hasInteracted, setHasInteracted] = useState(false);

    // Refs to hold Audio objects so they aren't recreated on every render
    const clickAudioRef = useRef(null);
    const hoverAudioRef = useRef(null);

    useEffect(() => {
        // Initialize Audio objects
        try {
            clickAudioRef.current = new Audio(SOUND_PATH);
            clickAudioRef.current.volume = 0.5;

            hoverAudioRef.current = new Audio(SOUND_PATH);
            hoverAudioRef.current.volume = 0.1;
            // Native Audio doesn't support "playbackRate" in constructor, set it after
            hoverAudioRef.current.playbackRate = 2.0;
            // Note: playbackRate on HTML5 Audio might not work in all browsers perfectly without pitch correction 
            // but it's worth a try. Ideally we'd valid files for each sound.

            // Interaction listener to unlock audio
            const handleInteraction = () => {
                setHasInteracted(true);
                // Optional: Silent play to unlock if needed, but usually clicking is enough
                window.removeEventListener('click', handleInteraction);
                window.removeEventListener('keydown', handleInteraction);
            };

            window.addEventListener('click', handleInteraction);
            window.addEventListener('keydown', handleInteraction);

            return () => {
                window.removeEventListener('click', handleInteraction);
                window.removeEventListener('keydown', handleInteraction);
            };
        } catch (e) {
            console.error("Audio initialization failed:", e);
        }
    }, []);

    const playClick = () => {
        try {
            if (clickAudioRef.current) {
                clickAudioRef.current.currentTime = 0; // Reset to start
                const promise = clickAudioRef.current.play();
                if (promise !== undefined) {
                    promise.catch(error => console.error("Click play failed:", error));
                }
            }
        } catch (e) {
            console.error("PlayClick execution error:", e);
        }
    };

    const playHover = () => {
        // Only play hover sound if user has interacted (avoid console noise)
        if (!hasInteracted) return;

        try {
            if (hoverAudioRef.current) {
                hoverAudioRef.current.currentTime = 0;
                hoverAudioRef.current.playbackRate = 2.0; // Ensure rate is set
                const promise = hoverAudioRef.current.play();
                if (promise !== undefined) {
                    promise.catch(error => {
                        // Ignore "AbortError" which happens if we play/pause quickly (fast hovering)
                        if (error.name !== 'AbortError') {
                            console.error("Hover play failed:", error);
                        }
                    });
                }
            }
        } catch (e) {
            console.error("PlayHover execution error:", e);
        }
    };

    return { playClick, playHover };
};
