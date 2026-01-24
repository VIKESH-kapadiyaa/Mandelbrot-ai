import useSound from 'use-sound';

// Short synthesized blip for hover (high pitch, short decay)
const hoverSound = 'data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'; // Placeholder, useSound might need real file or better encoded string. 
// Actually, empty base64 is often not enough. Let's use a standard silent fallback or a known short beep if possible. 
// Since we can't easily generate valid wav binaries here without a lot of text, 
// I will assume for this "Polishing" step that we might need to skip the actual binary content generation 
// OR use a very simple effective strategy: minimal hosted files or just simple extensive variable.
// usage of `use-sound` expects a URL.
// Let's use a publicly available sound URL for demo purposes or a simple encoded beep.

const CLICK_URL = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'; // Mechanical click
const HOVER_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'; // Short blip

export const useUISound = () => {
    const [playClick] = useSound(CLICK_URL, { volume: 0.5 });
    const [playHover] = useSound(HOVER_URL, { volume: 0.2, playbackRate: 2 }); // Pitch up for hover

    return { playClick, playHover };
};
