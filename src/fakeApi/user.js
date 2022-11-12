import fakeApi from "./fakeApi";

fakeApi.onPost('/api/user/login').reply(
    function (config) {
        const data = JSON.parse(config.data);
        if(data.username==='admin@demo.com' && data.password==='demo@123'){
            return [200, { user: { firstName: 'Sreejish', lastName: 'A G', email: 'sreecppgroup@gmail.com' } }];
        }else{
            return [500, { data: 'Invalid username/password' }];
        }
    }    
)