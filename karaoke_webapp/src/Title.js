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

let notes = [];

const setNotes = (stuff) => {
    notes = stuff;
    console.log("AAAAAAAAAA" + notes);
}

export {title, image, access, id, start, cancel, notes, setTitle, setImage, setAccess, removeAccess, setId, startA, cancelA, setNotes};