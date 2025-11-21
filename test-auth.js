import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3002';

async function testAuth() {
  console.log('🧪 Testing Authentication Flow\n');

  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123456'
  };

  // Test 1: Registration
  console.log('1️⃣ Testing Registration...');
  try {
    const registerResponse = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    const registerData = await registerResponse.json();
    console.log('   Status:', registerResponse.status);
    console.log('   Response:', registerData);

    if (!registerData.success) {
      console.log('   ❌ Registration failed');
      return;
    }
    console.log('   ✅ Registration successful\n');
  } catch (err) {
    console.error('   ❌ Registration error:', err.message);
    return;
  }

  // Test 2: Login with correct credentials
  console.log('2️⃣ Testing Login with correct credentials...');
  try {
    const loginResponse = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });

    const loginData = await loginResponse.json();
    console.log('   Status:', loginResponse.status);
    console.log('   Response:', loginData);

    if (loginData.success) {
      console.log('   ✅ Login successful\n');
    } else {
      console.log('   ❌ Login failed with correct credentials\n');
    }
  } catch (err) {
    console.error('   ❌ Login error:', err.message);
    return;
  }

  // Test 3: Login with wrong password
  console.log('3️⃣ Testing Login with wrong password...');
  try {
    const loginResponse = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: 'wrongpassword'
      })
    });

    const loginData = await loginResponse.json();
    console.log('   Status:', loginResponse.status);
    console.log('   Response:', loginData);

    if (!loginData.success) {
      console.log('   ✅ Correctly rejected wrong password\n');
    } else {
      console.log('   ❌ Should have rejected wrong password\n');
    }
  } catch (err) {
    console.error('   ❌ Login error:', err.message);
  }

  // Test 4: Login with wrong email
  console.log('4️⃣ Testing Login with wrong email...');
  try {
    const loginResponse = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'wrong@example.com',
        password: testUser.password
      })
    });

    const loginData = await loginResponse.json();
    console.log('   Status:', loginResponse.status);
    console.log('   Response:', loginData);

    if (!loginData.success) {
      console.log('   ✅ Correctly rejected wrong email\n');
    } else {
      console.log('   ❌ Should have rejected wrong email\n');
    }
  } catch (err) {
    console.error('   ❌ Login error:', err.message);
  }

  console.log('✅ All tests completed!');
}

testAuth().catch(console.error);
