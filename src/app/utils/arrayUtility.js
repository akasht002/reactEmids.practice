export const uniqElementOfArray = data => {
    console.log(data)
   let uniqueArray = data.filter(function(item, pos) {
        return data.indexOf(item) === pos;
    })
    return uniqueArray
}
