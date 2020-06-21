/** 
*       Easy Http Library
**/

class EasyHttp {
    // make a Http Get request
    async get(url){
        const response = await fetch(url);

        const resData = await response.json();
        return resData; 
        

    }

    // make a http Post request
    async post(url, data){
        
         const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)

            });
            const resData = await response.json();
            return resData; 


        

    }

    // make a http Put request
    async put(url, data){

         const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
        });
        
        const resData = await response.json();
        return resData; 
    }

    // Delete
    async delete(url, data){

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
             });
                const resData = await 'Resource Deleted';
                return resData; 


        

    }


}
