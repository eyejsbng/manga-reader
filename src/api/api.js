import axios from 'axios';

export function getLatest(url) {
    axios.get(url).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}
export function getTop() {
    
}