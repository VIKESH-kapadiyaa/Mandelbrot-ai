import useSound from 'use-sound';

const SOUND_PATH = '/sound/mixkit-sci-fi-click-900.wav';

export const useUISound = () => {
    const [playClick, { error: clickError }] = useSound(SOUND_PATH, {
        volume: 0.5,
        onload: () => console.log('Click sound loaded'),
        onloaderror: (id, err) => console.error('Click sound load error:', err)
    });

    const [playHover, { error: hoverError }] = useSound(SOUND_PATH, {
        volume: 0.1,
        playbackRate: 4,
        interrupt: true,
        onload: () => console.log('Hover sound loaded'),
        onloaderror: (id, err) => console.error('Hover sound load error:', err)
    });

    if (clickError) console.error('Click sound error:', clickError);
    if (hoverError) console.error('Hover sound error:', hoverError);

    const wrappedPlayClick = () => {
        console.log('Attempting to play click sound');
        playClick();
    };

    const wrappedPlayHover = () => {
        // console.log('Attempting to play hover sound'); // Commented out to avoid spam
        playHover();
    };

    return { playClick: wrappedPlayClick, playHover: wrappedPlayHover };
};
