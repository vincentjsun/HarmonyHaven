let title = "";
let image = "";

const setTitle = (desc) => {
    title = desc;
}

const setImage = (img) => {
    image = img;
}

let access = false;

let id = "";

const setAccess = () => {
    access = true;
}

const removeAccess = () => {
    access = false;
}

const setId = (email) => {
    id = email;
}

let start = 2;

const startA = () => {
    start += 1;
}

let cancel = 2;

const cancelA = () => {
    cancel += 1;
}

export {title, image, access, id, start, cancel, setTitle, setImage, setAccess, removeAccess, setId, startA, cancelA};