import axios from "axios";

export default {
    search: function (searchQuery) {
        return axios.post("/api/nutr", searchQuery);
    }
}