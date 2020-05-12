const normalizeGradientStr = (g) => {
    const gradient = g.replace(';', '').replace('background-image:', '');
    let el = document.createElement('p');
    document.body.appendChild(el);
    el.style.backgroundImage = gradient;
    const gradientStr = getComputedStyle(el).backgroundImage;
    document.body.removeChild(el);
    return gradientStr !== 'none' ? gradientStr : false;
};

export default normalizeGradientStr;
