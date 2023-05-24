const { Builder, By } = require('selenium-webdriver');

// Helper function to perform login and action
async function login(username, password, driver) {
    // open user dropdown
    await driver.get('http://localhost:3000');
    await driver.findElement(By.className('profile-btn')).click();

    // log in
    await driver.findElement(By.className('Login-main-container')).click();
    await driver.findElement(By.className('email-input')).sendKeys(username);
    await driver.findElement(By.className('password-input')).sendKeys(password);
    await driver.findElement(By.className('login-sumbit-button')).click();

    // wait 5 seconds
    await driver.manage().setTimeouts({ implicit: 3000 });

    // assert correct user is displayed
    const userProfile = await driver.findElement(By.className('profile-image')).getAttribute('src')
    if (userProfile.length > 0) {
    } else {
        console.log('Assertion failed: User is not logged in');
    }
}

// Export the helper function
module.exports = {
    login
};
