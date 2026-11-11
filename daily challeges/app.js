// ==========================================
// DAY 1
// ==========================================
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Testing Day 1:
async function runDay1() {
  await delay(2000);
  console.log("Day 1: This prints after 2 seconds");
}
runDay1();


// ==========================================
// DAY 2
// ==========================================
function stepOne() {
  return new Promise(resolve => {
    const time = Math.floor(Math.random() * 1000) + 500;
    setTimeout(() => resolve(`Step 1 finished in ${time}ms`), time);
  });
}

function stepTwo() {
  return new Promise(resolve => {
    const time = Math.floor(Math.random() * 1000) + 500;
    setTimeout(() => resolve(`Step 2 finished in ${time}ms`), time);
  });
}

function stepThree() {
  return new Promise(resolve => {
    const time = Math.floor(Math.random() * 1000) + 500;
    setTimeout(() => resolve(`Step 3 finished in ${time}ms`), time);
  });
}

// Testing Day 2 
async function runDay2() {
  console.time("Day 2 Total Execution Time");
  
  stepOne()
    .then(result1 => {
      console.log(result1);
      return stepTwo();
    })
    .then(result2 => {
      console.log(result2);
      return stepThree();
    })
    .then(result3 => {
      console.log(result3);
      console.timeEnd("Day 2 Total Execution Time");
    })
    .catch(error => console.error("Error in chain:", error));
}
runDay2();


// ==========================================
// DAY 3
// ==========================================
async function fetchUser(userId) {
  const defaultUser = { id: 0, name: "Guest User", role: "default" };

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    // If user doesn't exist (e.g., 404 status), return default user instead of throwing
    if (!response.ok) {
      console.warn(`User not found (Status: ${response.status}). Returning default user.`);
      return defaultUser;
    }

    return await response.json();
  } catch (error) {
    console.error("Network or parsing error occurred, falling back to default user:", error);
    return defaultUser;
  }
}

// Testing Day 3 (Using ID 9999 which will trigger a 404):
async function runDay3() {
  const user = await fetchUser(9999);
  console.log("Day 3 Result:", user);
}
runDay3();


// ==========================================
// DAY 4
// ==========================================
// Rewriting the Day 2 promise chain logic cleanly using async/await
async function runDay4() {
  console.log("--- Day 4: Async/Await Workflow Start ---");
  try {
    const res1 = await stepOne();
    console.log(res1);

    const res2 = await stepTwo();
    console.log(res2);

    const res3 = await stepThree();
    console.log(res3);
    
    console.log("--- Day 4: Async/Await Workflow Complete ---");
  } catch (error) {
    console.error("Error during async/await execution:", error);
  }
}
runDay4();


// ==========================================
// DAY 5
// ==========================================
async function runDay5() {
  const endpoints = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3"
  ];

  try {
    // Fetch data from 3 different endpoints simultaneously
    const promises = endpoints.map(url => fetch(url).then(res => res.json()));
    
    const results = await Promise.allSettled(promises);

    console.log("--- Day 5: Parallel Fetches Results ---");
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Endpoint ${index + 1} Success:`, result.value);
      } else {
        console.error(`Endpoint ${index + 1} Failed:`, result.reason);
      }
    });
  } catch (error) {
    console.error("Unexpected error in parallel fetches:", error);
  }
}
runDay5();