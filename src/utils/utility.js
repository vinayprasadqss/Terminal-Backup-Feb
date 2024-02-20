export function generateUniqueFileName() {
  // Get the current date and time
  const currentDateTime = new Date();

  // Create a timestamp string with the format: YYYY-MM-DD-HH-mm-ss-ms
  const timestamp = `${currentDateTime.getFullYear()}-${String(
    currentDateTime.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDateTime.getDate()).padStart(
    2,
    "0"
  )}-${String(currentDateTime.getHours()).padStart(2, "0")}-${String(
    currentDateTime.getMinutes()
  ).padStart(2, "0")}-${String(currentDateTime.getSeconds()).padStart(
    2,
    "0"
  )}-${currentDateTime.getMilliseconds()}`;

  // Use the timestamp as part of the unique file name
  const uniqueFileName = `file_${timestamp}`;

  return uniqueFileName;
}

export function clearzAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

export const SaveSearch_Utillity = (query, nameSearch, tab, prefix, filter) => {
  try {
    const filteredData = Object.fromEntries(
      Object.entries(filter).filter(([key, value]) => value.length > 0)
    );
    let cat = [
      {
        tab: tab,
        nameSearch: nameSearch,
        prefix: prefix,
        filters: filteredData,
      },
    ];
    let payload = {
      query: query,
      category: JSON.stringify(cat),
    };

    return payload;
  } catch (error) {
    console.log(error);
  }
};

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const CheckFieldIsEmpty = (field, name) => {
  if (field === "") {
    if (name === "email") {
      return "Email is Required!";
    } else if (name === "name") {
      return "Name is Required!";
    } else if (name === "password") {
      return "Password is Required!";
    } else if (name === "confirmPassword") {
      return "Confirm Password is Required!";
    }
  }
};

export const isPasswordValid = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  const isValid = hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
  return isValid;
};

export const isNameIsValid = (name) => {
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  if (usernamePattern.test(name)) {
    return true;
  } else {
    return false;
  }
};

export function replaceKeysWithNonEmptyArrays(obj1, obj2) {
  for (const key in obj2) {
    if (
      obj1.hasOwnProperty(key) &&
      Array.isArray(obj1[key]) &&
      obj2[key].length > 0
    ) {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
}

export const FilterFinder = (fil) => {
  const Fit = JSON.parse(fil);
  return Fit[0]?.filters;
};
