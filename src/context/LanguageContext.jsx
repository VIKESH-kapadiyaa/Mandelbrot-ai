import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        nav: { home: 'Aether AI', book: 'Book Call' },
        hero: {
            title_prefix: 'THE',
            title_future: 'FUTURE',
            desc_part1: 'Constructing autonomous digital architectures for the',
            desc_part2: 'post-labor economy',
            cta_init: 'INITIALIZE SYSTEM',
            cta_view: 'VIEW ARCHITECTURE',
            status: 'System Online & Available'
        },
        work: {
            title: 'WORK',
            subtitle: 'Cutting-edge AI agents powering the future of automation',
            search_placeholder: 'Search agents...',
            no_results: 'No agents found matching your query.'
        }
    },
    fr: {
        nav: { home: 'Aether IA', book: 'Réserver' },
        hero: {
            title_prefix: 'LE',
            title_future: 'FUTUR',
            desc_part1: 'Construction d\'architectures numériques autonomes pour',
            desc_part2: 'l\'économie post-travail',
            cta_init: 'INITIALISER SYSTÈME',
            cta_view: 'VOIR ARCHITECTURE',
            status: 'Système En Ligne'
        },
        work: {
            title: 'PROJETS',
            subtitle: 'Agents IA de pointe propulsant l\'avenir de l\'automatisation',
            search_placeholder: 'Rechercher des agents...',
            no_results: 'Aucun agent trouvé.'
        }
    },
    es: {
        nav: { home: 'Aether IA', book: 'Agendar' },
        hero: {
            title_prefix: 'EL',
            title_future: 'FUTURO',
            desc_part1: 'Construyendo arquitecturas digitales autónomas para la',
            desc_part2: 'economía post-laboral',
            cta_init: 'INICIAR SISTEMA',
            cta_view: 'VER ARQUITECTURA',
            status: 'Sistema En Línea'
        },
        work: {
            title: 'TRABAJO',
            subtitle: 'Agentes de IA de vanguardia que impulsan el futuro de la automatización',
            search_placeholder: 'Buscar agentes...',
            no_results: 'No se encontraron agentes.'
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState('en');

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[locale];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
