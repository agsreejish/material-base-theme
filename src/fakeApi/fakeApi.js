import MockAdapter from "axios-mock-adapter";

import axios from "../helpers/axios";

const fakeApi = new MockAdapter(axios, { delayResponse: 0 });

export default fakeApi;
