import axios from "axios";

export const getdata = async (url) => {
    var response = await axios.get(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "no-cors",
        credentials: "include",
    });

    return response;
};
