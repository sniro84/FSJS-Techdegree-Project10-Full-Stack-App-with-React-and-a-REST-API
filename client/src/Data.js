export default class Data {
    api(path, method='GET',body = null, requiresAuth = false, credentials = null) {
        const url = 'http://localhost:5000/api' + path;

        const options = {
            method,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          };

        if (body !== null)
            options.body = JSON.stringify(body);
        
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url,options);
    }

    async getUser(email, password) {
        const res = await this.api(`/users`, 'GET', null, true, {email,password} );
        if (res.status === 200) 
          return res.json().then( (data) => data);
        else if (res.status === 401) 
          return null;
        else {
          throw new Error();
        }
      }
      
    async createUser(user) {
        const res = await this.api('/users', 'POST', user);
        if (res.status === 201) 
            return [];
        else if (res.status === 400) {
            return res.json().then( (data) => {
                return data.errors;
            });
        }
        else 
            throw new Error();
    }
}