import { useEffect, useState } from 'react';

export const ResponsiveImage = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getImageSrc = () => {
        if (screenWidth >= 850) {
            return 'https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png';
        } else {
            return 'https://abs.twimg.com/sticky/illustrations/lohp_850x623.png';
        }
    };

    const imageSrc = getImageSrc();

    return <img className="md:h-screen object-cover" src={imageSrc} alt="Imagen Responsive" />;
};