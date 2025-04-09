export function postFile(file, token, type) {
  const url = `https://back.dvst.ir/File/File/Upload`;

  const formData = new FormData();
  formData.append("File", file);
  formData.append("Type", type);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    });
}

export function postFileExcel(file, token) {
  const url = `https://back.dvst.ir/Product/Good/UpdateWithExcel`;

  const formData = new FormData();
  formData.append("File", file);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    });
}
