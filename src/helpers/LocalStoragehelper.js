export function setFavoriteToLocalStorage (profileObject) {
    const currentLocalStorage = JSON.parse(localStorage.getItem('favoriteData') || '{}');
    localStorage.setItem('favoriteData', JSON.stringify({
        ...currentLocalStorage,
        [profileObject.id] : {
            ...profileObject
        }
    }));
}

export function removeFromLocalStorage(id) {
    const currentLocalStorage = JSON.parse(localStorage.getItem('favoriteData'));
    delete currentLocalStorage[id];
    localStorage.setItem('favoriteData', JSON.stringify(currentLocalStorage));
}

export function transformNetworkResponse(response) {
    const currentLocalStorage = JSON.parse(localStorage.getItem('favoriteData') || '{}');
    return response.map(profileObject => {
        return {
            ...profileObject,
            isFavourite : !!currentLocalStorage[profileObject.id]
        }
    })
}

export function getFavoriteList() {
    const currentLocalStorage = JSON.parse(localStorage.getItem('favoriteData') || '{}');
    return Object.values(currentLocalStorage).map(placeObject => ({
        ...placeObject,
        isFavourite : true
    }))
}