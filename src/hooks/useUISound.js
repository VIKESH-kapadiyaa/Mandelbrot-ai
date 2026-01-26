import { useRef } from 'react';

const SOUND_PATH = '/sound/mixkit-sci-fi-click-900.wav';

export const useUISound = () => {
    // We use a ref to keep a master audio object mainly for preloading
    const masterAudioRef = useRef(new Audio(SOUND_PATH));

    // Helper to play sound with "polyphony" (allowing overlapping sounds)
    const playSound = (volume = 0.5, rate = 1.0) => {
        try {
            // Clone the node to allow overlapping sounds (e.g. fast clicking)
            const soundClone = masterAudioRef.current.cloneNode();
            soundClone.volume = volume;
            soundClone.playbackRate = rate;

            // Clean up when done (optional but good for memory in long sessions)
            // soundClone.onended = () => { ... }; 

            const promise = soundClone.play();
            if (promise !== undefined) {
                promise.catch(e => {
                    // Auto-play blocking is common, usually ignored after first interaction
                    if (e.name !== 'NotAllowedError') {
                        console.error("Audio play failed", e);
                    }
                });
            }
        } catch (e) {
            console.error("Audio error", e);
        }
    };

    const playClick = () => playSound(0.4, 1.0);
    const playHover = () => playSound(0.1, 2.0); // Higher pitch, lower volume

    return { playClick, playHover };
};
