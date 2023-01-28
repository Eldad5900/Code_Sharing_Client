const API_URL = "http://localhost:3003/.netlify/functions/api";

export class UserService {
    
    async editCode(code, codeId) {
        return fetch(`${API_URL}/${codeId}`, {
          method: "PATCH",
          body: JSON.stringify(code),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(this.success)
          .catch(this.failure);
      }

      async success(response) {
        const data = await response.json();
        return data;
      }
    
      failure(response) {
        const message = `An error has occured: ${response}`;
        throw new Error(message);
      }
}