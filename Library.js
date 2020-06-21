const http = new EasyHttp;


// get users
http.get('http://jsonplaceholder.typicode.com/users')
.then(data => console.log(data))
.catch(err => console.log(err));


// user data

const data = {
    name: 'John Doe',
    username: 'John123',
    email: 'John@email'
}

// Create post
http.post('http://jsonplaceholder.typicode.com/users', data)
.then(data => console.log(data))
.catch(err => console.log(err));


// Update post
http.put('http://jsonplaceholder.typicode.com/users/2', data)
.then(data => console.log(data))
.catch(err => console.log(err));


// Delete USer
http.delete('http://jsonplaceholder.typicode.com/users/2')
.then(data => console.log(data))
.catch(err => console.log(err));