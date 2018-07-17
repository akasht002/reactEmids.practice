export const Loading = {
    loadingStart: 'loading_start/loading',
    loadingEnd: 'loading_end/loading'
};

export const startLoading = () => {
    return {
        type: Loading.loadingStart
    }
}

export const endLoading = () => {
    return {
        type: Loading.loadingEnd
    }
}
