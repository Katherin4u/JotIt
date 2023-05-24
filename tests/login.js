const { Builder, By } = require('selenium-webdriver');

async function runTest() {
    // Set up the Selenium WebDriver
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the local application
        await driver.get('http://localhost:3000');

        // open user dropdown
        await driver.findElement(By.className('profile-btn')).click();

        // log in
        await driver.findElement(By.className('Login-main-container')).click();
        await driver.findElement(By.className('email-input')).sendKeys('demo@user.io');
        await driver.findElement(By.className('password-input')).sendKeys('password');
        await driver.findElement(By.className('login-sumbit-button')).click();

        // wait 5 seconds
        await driver.manage().setTimeouts({implicit: 5000});

        // assert correct user is displayed
        const userProfile = await driver.findElement(By.className('profile-image')).getAttribute('src')
        if (userProfile.length > 0) {
            console.log('Assertion Passed: User is logged in');
        } else {
            console.log('Assertion Failed: User is not logged in');
        }

        // Close the browser and end the Selenium test
        await driver.quit();
    } catch (error) {
        console.error('An error occurred:', error);
        // Handle or log any errors encountered during the test
        await driver.quit();
    }
}

runTest();
