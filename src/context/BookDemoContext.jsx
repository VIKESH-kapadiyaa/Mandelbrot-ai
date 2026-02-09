import { createContext, useContext, useState } from 'react';

const BookDemoContext = createContext();

export const BookDemoProvider = ({ children }) => {
    const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);

    const openBookDemo = () => setIsBookDemoOpen(true);
    const closeBookDemo = () => setIsBookDemoOpen(false);

    return (
        <BookDemoContext.Provider value={{ isBookDemoOpen, openBookDemo, closeBookDemo }}>
            {children}
        </BookDemoContext.Provider>
    );
};

export const useBookDemo = () => {
    const context = useContext(BookDemoContext);
    if (!context) {
        throw new Error('useBookDemo must be used within BookDemoProvider');
    }
    return context;
};
