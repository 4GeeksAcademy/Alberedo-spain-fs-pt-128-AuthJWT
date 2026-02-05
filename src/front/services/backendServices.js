export const register = async (user, navigate) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/register`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    alert(data.error);
  } else {
    alert("User created successfully. Now you can log in");
    navigate("/");
  }
};

export const login = async (user, navigate) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    alert(data.error);
  } else {
    localStorage.setItem("token", data.access_token);
    navigate("/private");
  }
};

export const privateCheck = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return false;
  }
  return data;
};
