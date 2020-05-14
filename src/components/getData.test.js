import axiosMock from "axios";
import { getdata } from "./getData";

jest.mock("axios");

test("loads data from API", async () => {
    const photos = { page: 1, pages: 6701, perpage: 100, total: "670055", photo: Array(100) };
    const res = { data: photos };
    let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=" + process.env.REACT_APP_SECRET_KEY + "&is_getty=1&page=1";

    const response = getdata(url);

    axiosMock.get.mockResolvedValueOnce(res);
    axiosMock.get.mockImplementation(() => Promise.resolve(res));

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(response).toBeTruthy();
    expect(response).not.toBeNull();
    expect(response).not.toBe("error");
    expect(axiosMock.get).toMatchSnapshot();
    expect(response).toMatchSnapshot();
    getdata().then((data) => expect(data).toEqual(res));
});
