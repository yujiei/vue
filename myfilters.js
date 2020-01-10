export const dateFormat = (time,spe) =>{
        time = new Date(time)
        spe = spe || '/'
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        return `${year}${spe}${month}${spe}${day}`
}