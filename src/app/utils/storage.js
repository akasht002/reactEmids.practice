export function save(id, data) {
    let payLoad = { id: id, data: data };
    localStorage.setItem(id, JSON.stringify(payLoad));
}

export function remove(id, cb) {
    return(dispatch) => {
        localStorage.removeItem(id);
        dispatch(cb({
            error: 0,
            message: "data removed"
        }))
    }
}

export function load(id, cb) {
    return (dispatch) => {
        let payLoad = { id: id };
        payLoad.data = JSON.parse(localStorage.getItem(id));
        dispatch(cb(payLoad.data));
    }
}

export function loadData(id) {
    return JSON.parse(localStorage.getItem(id));
}