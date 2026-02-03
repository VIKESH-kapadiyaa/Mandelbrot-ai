import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, image, url, type = 'website' }) => {
    const siteTitle = 'Mandelbrot | Automating the Future';
    const siteDescription = 'Mandelbrot builds autonomous digital architectures for the post-labor economy. Automating the Future with intelligent AI systems.';
    const siteUrl = 'https://mandelbrot.ai'; // Replace with actual domain
    const siteImage = 'https://mandelbrot.ai/og-image.jpg'; // Replace with actual default OG image

    const metaTitle = title ? `${title} | Mandelbrot` : siteTitle;
    const metaDescription = description || siteDescription;
    const metaImage = image || siteImage;
    const metaUrl = url || siteUrl;

    return (
        <Helmet>
            {/* Standard Metrics */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Facebook / Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};
