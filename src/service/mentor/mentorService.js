const API_URL = "https://codesharing.herokuapp.com/user";

export class MentorService {
  async getAllCodesBlock() {
    return fetch(`${API_URL}/getAll`).then(this.success).catch(this.failure);
  }

  async addCodeBlock(codeBlock) {
    return fetch(`${API_URL}/addIteam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codeBlock),
    })
      .then(this.success)
      .catch(this.failure);
  }

  async getCodeById(codeId) {
    return fetch(`${API_URL}/get-codeBlock-by-id/${codeId}`)
      .then(this.success)
      .catch(this.failure);
  }

  async editBlockCode(code, codeId) {
    return fetch(`${API_URL}/${codeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then(this.success)
      .catch(this.failure);
  }

  async success(response) {
    const data = await response.json();
    return data;
  }

  failure(response) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
}
